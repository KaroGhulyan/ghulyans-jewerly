import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img 
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80" 
                        alt="Jewelry Workshop" 
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-20 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-200 font-light">
                        Crafting Timeless Elegance and Armenian Heritage Since 1994.
                    </p>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <img 
                                src="https://images.unsplash.com/photo-1573408301185-9146fe624df0?auto=format&fit=crop&q=80" 
                                alt="Master Jeweler" 
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="space-y-6 order-1 md:order-2">
                            <h2 className="text-3xl font-bold text-gray-900">A Legacy of Craftsmanship</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Founded in the heart of Yerevan, Ghulyan's Jewelry began as a small family atelier dedicated to the ancient art of Armenian goldsmithing. Over the decades, we have remained committed to the traditional techniques passed down through generations.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Each piece is meticulously handcrafted by our master jewelers, ensuring that every curve, every setting, and every gemstone tells a story of passion and precision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-16 text-gray-900">Why Choose Ghulyan's</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl text-amber-600 font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Ethical Sourcing</h3>
                            <p className="text-gray-600">
                                We source only the finest conflict-free diamonds and ethically mined precious metals.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl text-amber-600 font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Unique Design</h3>
                            <p className="text-gray-600">
                                Blending traditional Armenian motifs with modern aesthetics for pieces that are truly unique.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl text-amber-600 font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Lifetime Guarantee</h3>
                            <p className="text-gray-600">
                                We stand behind our quality. Every purchase comes with our lifetime craftsmanship guarantee.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8">Ready to find your piece of history?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/products">Explore Collection</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/featured">View Featured</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
