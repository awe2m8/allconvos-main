export function FAQ() {
    return (
        <section className="py-24 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Questions We Get Asked</h2>
            <div className="space-y-6">
                {/* Q1 */}
                <div className="border border-white/5 bg-ocean-900/50 p-6 rounded-sm">
                    <h4 className="font-bold text-white mb-2">Will it sound like a robot?</h4>
                    <p className="text-gray-400 text-sm">No. We train it on your tone of voice. Most customers don&apos;t even realize they&apos;re talking to an AI until the booking is confirmed.</p>
                </div>
                {/* Q2 */}
                <div className="border border-white/5 bg-ocean-900/50 p-6 rounded-sm">
                    <h4 className="font-bold text-white mb-2">What if I need to answer the phone myself?</h4>
                    <p className="text-gray-400 text-sm">You still can. You can set the AI to only pick up if you don&apos;t answer after 5 rings, or only manage calls after hours.</p>
                </div>
                {/* Q3 */}
                <div className="border border-white/5 bg-ocean-900/50 p-6 rounded-sm">
                    <h4 className="font-bold text-white mb-2">Does it work with existing numbers?</h4>
                    <p className="text-gray-400 text-sm">Yes. You simply forward your missed calls to the number we give you. It takes 2 minutes to set up.</p>
                </div>
                {/* Q4 */}
                <div className="border border-white/5 bg-ocean-900/50 p-6 rounded-sm">
                    <h4 className="font-bold text-white mb-2">What is the "Trigger Moment"?</h4>
                    <p className="text-gray-400 text-sm">We find most clients join us after losing a big job (like $5k+) because they were too busy on the tools to answer the phone. We stop that bleeding immediately.</p>
                </div>
                {/* Q5 */}
                <div className="border border-white/5 bg-ocean-900/50 p-6 rounded-sm">
                    <h4 className="font-bold text-white mb-2">Can I cancel anytime?</h4>
                    <p className="text-gray-400 text-sm">Yes. No lock-in contracts. We earn your business every month.</p>
                </div>
            </div>
        </section>
    );
}
