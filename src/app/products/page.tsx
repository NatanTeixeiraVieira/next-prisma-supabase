import { getProducts } from "./_actions/product-actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProductList from "./_components/list"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  )
}
