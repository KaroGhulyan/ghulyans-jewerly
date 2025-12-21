import { PrismaClient, ProductCategory } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing data
    await prisma.product.deleteMany()
    await prisma.admin.deleteMany()

    // Create sample jewelry products
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Classic Gold Ring',
                nameHy: 'Դասական Ոսկյա Մատանի',
                description: 'Elegant 18k gold ring with timeless design. Perfect for everyday wear or special occasions.',
                descriptionHy: 'Նրբագեղ 18 կարատ ոսկյա մատանի անժամանակային դիզայնով։',
                price: 450000,
                category: ProductCategory.RING,
                material: '18K Gold',
                weight: 3.5,
                size: 'Size 7',
                images: [
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
                ],
                inStock: true,
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Diamond Pendant Necklace',
                nameHy: 'Ադամանդե Կախազարդ',
                description: 'Stunning diamond pendant on a delicate white gold chain. 0.5 carat center stone.',
                descriptionHy: 'Հիանալի ադամանդե կախազարդ նուրբ սպիտակ ոսկյա շղթայով։',
                price: 1250000,
                category: ProductCategory.NECKLACE,
                material: '14K White Gold, Diamond',
                weight: 2.8,
                size: '18 inches',
                images: [
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
                ],
                inStock: true,
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Silver Bracelet',
                nameHy: 'Արծաթե Ապարանջան',
                description: 'Handcrafted sterling silver bracelet with intricate Armenian patterns.',
                descriptionHy: 'Ձեռքի աշխատանքով պատրաստված արծաթե ապարանջան հայկական նախշերով։',
                price: 180000,
                category: ProductCategory.BRACELET,
                material: '925 Sterling Silver',
                weight: 15.0,
                size: '7.5 inches',
                images: [
                    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
                ],
                inStock: true,
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Pearl Drop Earrings',
                nameHy: 'Մարգարտե Ականջօղեր',
                description: 'Elegant freshwater pearl earrings with gold hooks. Perfect for formal events.',
                descriptionHy: 'Նուրբ ընտանի մարգարտե ականջօղեր ոսկե կախիչներով։',
                price: 320000,
                category: ProductCategory.EARRINGS,
                material: '14K Gold, Freshwater Pearl',
                weight: 2.0,
                images: [
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
                ],
                inStock: true,
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Emerald Ring',
                nameHy: 'Զմրուխտե Մատանի',
                description: 'Luxurious emerald ring set in yellow gold. 2 carat natural emerald.',
                descriptionHy: 'Շքեղ զմրուխտե մատանի դեղին ոսկով։ 2 կարատ բնական զմրուխտ։',
                price: 2800000,
                category: ProductCategory.RING,
                material: '18K Yellow Gold, Emerald',
                weight: 4.2,
                size: 'Size 6.5',
                images: [
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
                ],
                inStock: true,
                featured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Wedding Band Set',
                nameHy: 'Պսակադրության Մատանիներ',
                description: 'Matching his and hers wedding bands in white gold. Sold as a pair.',
                descriptionHy: 'Զույգ պսակադրության մատանիներ սպիտակ ոսկուց։',
                price: 850000,
                category: ProductCategory.SET,
                material: '14K White Gold',
                weight: 8.0,
                size: 'His: Size 10, Hers: Size 6',
                images: [
                    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
                ],
                inStock: true,
                featured: true,
            },
        }),
    ])

    console.log(`✅ Created ${products.length} products`)

    // Create admin user (password should be hashed in real app)
    const admin = await prisma.admin.create({
        data: {
            email: 'admin@jewelry.am',
            password: 'admin123', // In production, this should be hashed!
            name: 'Admin User',
        },
    })

    console.log(`✅ Created admin user: ${admin.email}`)
    console.log('🎉 Seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })