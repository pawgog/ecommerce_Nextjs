import { faker } from '@faker-js/faker'
import { neon } from '@neondatabase/serverless'
// import { Index } from '@upstash/vector'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
// import { vectorize } from '../lib/vectorize'
import { productTable } from './schema'

dotenv.config()

// const index = new Index()

async function main() {
  const connector = neon(process.env.DB_URL!)

  const db = drizzle(connector)

  const products: (typeof productTable.$inferInsert)[] = []

  const productImageIDs = [
    {
      imgId: 'laptop_1.png',
      description:
        'Laptops are designed to be portable computers. They are smaller and lighter than desktops. The name connotes the user ability to put the computer in their lap while they use it.',
    },
    {
      imgId: 'black_tablet_1.png',
      description:
        'A tablet is a wireless, portable personal computer with a touchscreen interface.',
    },
    {
      imgId: 'grey_tablet_2.png',
      description:
        'Tablet computers are smaller, thinner, and more lightweight than laptop computers.',
    },
    {
      imgId: 'smartwatch_1.png',
      description:
        'A smartwatch is a portable wearable computer that resembles a wristwatch.',
    },
    {
      imgId: 'laptop_sleeve_neoprene_1.png',
      description:
        'A laptop sleeve, also sometimes called a laptop pouch or bag, is typically a sleeve/bag/pouch manufactured from a material such as neoprene or leather',
    },
    {
      imgId: 'laptop_sleeve_leather_2.png',
      description:
        'They are a small and simple way to protect a Laptop (or tablet) without carrying a larger more traditional laptop bag',
    },
    {
      imgId: 'blue_laptop_sleeve_3.png',
      description:
        'This way a laptop in its sleeve can fit into another carry bag and reduce the need for two bags.',
    },
  ]

  productImageIDs.forEach(({ description, imgId }, i) => {
    products.push({
      id: (i + 1).toString(),
      name: formatFileName(imgId),
      description,
      price: parseFloat(faker.commerce.price({ min: 40, max: 200 })),
      imgId,
    })
  })

  products.forEach(async (product) => {
    await db.insert(productTable).values(product).onConflictDoNothing()

    // await index.upsert({
    //   id: product.id!,
    //   vector: await vectorize(`${product.name}: ${product.description}`),
    //   metadata: {
    //     id: product.id,
    //     name: product.name,
    //     description: product.description,
    //     price: product.price,
    //     imageId: product.imgId,
    //   },
    // })
  })
}

function formatFileName(fileName: string): string {
  const nameWithoutExtension = fileName.replace(/\.\w+$/, '')
  const words = nameWithoutExtension.split('_')

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(' ')
}

main()