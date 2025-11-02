import Carousel from "@/Components/carousel";
import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const dummyProducts = [
  {
    Name: "Wireless Headphones",
    description:
      "High-quality over-ear wireless headphones with noise cancellation.",
    price: 120,
    category: "Electronics",
    stock: 25,
    ratings: [
      { userId: "1", rate: 5 },
      { userId: "2", rate: 4 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product demo.webp",
  },
  {
    Name: "Smart Watch",
    description:
      "Fitness and health tracking smart watch with long battery life.",
    price: 99,
    category: "Electronics",
    stock: 40,
    ratings: [
      { userId: "3", rate: 5 },
      { userId: "4", rate: 4 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product banner.jpg",
  },
  {
    Name: "Gaming Laptop",
    description: "High-performance laptop for gaming and productivity.",
    price: 1500,
    category: "Computers",
    stock: 10,
    ratings: [
      { userId: "5", rate: 5 },
      { userId: "6", rate: 5 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product demo.webp",
  },
  {
    Name: "Bluetooth Speaker",
    description: "Portable speaker with excellent sound and waterproof design.",
    price: 60,
    category: "Electronics",
    stock: 50,
    ratings: [
      { userId: "7", rate: 4 },
      { userId: "8", rate: 5 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product banner.jpg",
  },
  {
    Name: "DSLR Camera",
    description: "Professional DSLR camera for high-quality photography.",
    price: 850,
    category: "Cameras",
    stock: 15,
    ratings: [
      { userId: "9", rate: 5 },
      { userId: "10", rate: 4 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product demo.webp",
  },
  {
    Name: "Bluetooth Speaker",
    description: "Portable speaker with excellent sound and waterproof design.",
    price: 60,
    category: "Electronics",
    stock: 50,
    ratings: [
      { userId: "7", rate: 4 },
      { userId: "8", rate: 5 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "/product banner.jpg",
  },
];

export default function Home() {
  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            src={"/product demo.webp"}
            className="rounded "
            width={450}
            height={450}
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={dummyProducts} />
      </section>
    </div>
  );
}
