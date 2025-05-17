import ProductForm from "../_components/form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <Link href="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <ProductForm />
      </div>
    </div>
  )
}
