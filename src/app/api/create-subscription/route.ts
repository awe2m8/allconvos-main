import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Price IDs - you'll need to create these in Stripe Dashboard
// and add them to your environment variables
const PRICE_IDS: Record<string, string> = {
    lite: process.env.STRIPE_PRICE_LITE || '',
    pro: process.env.STRIPE_PRICE_PRO || '',
};

export async function POST(request: NextRequest) {
    try {
        // Initialize Stripe lazily to avoid build-time errors if key is missing
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
        });

        const body = await request.json();
        const { paymentMethodId, planId, email, name, company } = body;

        // Validate required fields
        if (!paymentMethodId || !planId || !email || !name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get the price ID for the selected plan
        const priceId = PRICE_IDS[planId];
        if (!priceId) {
            return NextResponse.json(
                { error: 'Invalid plan selected. Please configure Stripe Price IDs.' },
                { status: 400 }
            );
        }

        // Create or retrieve customer
        const customers = await stripe.customers.list({ email, limit: 1 });
        let customer: Stripe.Customer;

        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({
                email,
                name,
                metadata: {
                    company: company || '',
                },
            });
        }

        // Attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        });

        // Set as default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // Create the subscription with expanded fields
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            default_payment_method: paymentMethodId,
            payment_behavior: 'default_incomplete',
            collection_method: 'charge_automatically',
            expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
        });

        // Get invoice ID early for fallback
        const latestInvoice = subscription.latest_invoice as any;
        const invoiceId = latestInvoice?.id || (typeof subscription.latest_invoice === 'string' ? subscription.latest_invoice : null);

        let clientSecret: string | null = null;
        let secretSource = 'NONE';

        // Check 1: subscription.pending_setup_intent (SetupIntent flow)
        const pendingSetupIntent = (subscription as any).pending_setup_intent;
        if (pendingSetupIntent && pendingSetupIntent !== null) {
            if (typeof pendingSetupIntent === 'object' && pendingSetupIntent.client_secret) {
                clientSecret = pendingSetupIntent.client_secret;
                secretSource = 'subscription.pending_setup_intent';
            } else if (typeof pendingSetupIntent === 'string') {
                const si = await stripe.setupIntents.retrieve(pendingSetupIntent);
                clientSecret = si.client_secret;
                secretSource = 'subscription.pending_setup_intent (retrieved)';
            }
        }

        // Check 2: invoice.payment_intent (PaymentIntent flow)
        if (!clientSecret && latestInvoice && typeof latestInvoice === 'object') {
            const pi = latestInvoice.payment_intent;
            if (pi && typeof pi === 'object' && pi.client_secret) {
                clientSecret = pi.client_secret;
                secretSource = 'invoice.payment_intent';
            } else if (typeof pi === 'string') {
                const paymentIntent = await stripe.paymentIntents.retrieve(pi);
                clientSecret = paymentIntent.client_secret;
                secretSource = 'invoice.payment_intent (retrieved)';
            }
        }

        // Check 3 (FALLBACK): List customer's recent PaymentIntents and find by invoice
        if (!clientSecret && invoiceId) {
            const recentPIs = await stripe.paymentIntents.list({
                customer: customer.id,
                limit: 5,
            });

            for (const pi of recentPIs.data) {
                if ((pi as any).invoice === invoiceId) {
                    clientSecret = pi.client_secret;
                    secretSource = 'paymentIntents.list fallback';
                    break;
                }
            }
        }

        // Check 4 (LAST RESORT): Get the most recent PaymentIntent for this customer
        if (!clientSecret) {
            const recentPIs = await stripe.paymentIntents.list({
                customer: customer.id,
                limit: 1,
            });

            if (recentPIs.data.length > 0 && recentPIs.data[0].status === 'requires_confirmation') {
                clientSecret = recentPIs.data[0].client_secret;
                secretSource = 'paymentIntents.list last resort';
            }
        }

        console.log('Subscription created:', {
            id: subscription.id,
            status: subscription.status,
            clientSecretSource: secretSource,
            hasClientSecret: !!clientSecret
        });

        return NextResponse.json({
            subscriptionId: subscription.id,
            clientSecret: clientSecret,
            status: subscription.status,
            debug: {
                secretSource: secretSource,
                invoiceId: invoiceId || 'NONE',
                invoiceAmountDue: latestInvoice?.amount_due || 0,
                hasPendingSetupIntent: !!(pendingSetupIntent && pendingSetupIntent !== null),
                pendingSetupIntentType: typeof pendingSetupIntent,
                hasPaymentIntent: !!(latestInvoice?.payment_intent),
                paymentIntentType: typeof latestInvoice?.payment_intent,
            }
        });

    } catch (error) {
        console.error('Subscription creation error:', error);

        if (error instanceof Stripe.errors.StripeError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
