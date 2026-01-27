import { Button } from "../ui/Button";

export function FinalCTA() {
    return (
        <section id="cta" className="py-24 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                    READY FOR <br />
                    <span className="text-neon">OFF-DUTY?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12">
                    Stop being the admin assistant for your own business. Let allconvos handle the noise.
                </p>
                <Button className="text-xl px-12 py-6 h-auto">
                    Get Your Freedom Back
                </Button>
            </div>
        </section>
    );
}
