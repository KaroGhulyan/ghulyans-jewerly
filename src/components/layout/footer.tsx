import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 mt-16">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg bg-gradient-gold bg-clip-text text-transparent">
                            Armenian Jewelry
                        </h3>
                        <p className="text-sm text-gray-600">
                            Handcrafted jewelry from Armenia with love and tradition.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-600 hover:text-primary-600">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-primary-600">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products" className="text-gray-600 hover:text-primary-600">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/featured" className="text-gray-600 hover:text-primary-600">
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link href="/new" className="text-gray-600 hover:text-primary-600">
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-600 hover:text-primary-600">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 hover:text-primary-600">
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+374 XX XXX XXX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>info@jewelry.am</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Armenian Jewelry. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}