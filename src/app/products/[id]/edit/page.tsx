import { getProduct } from "../../_actions/product-actions"
import ProductForm from "../../_components/form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

type EditProductPageProps = { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: EditProductPageProps) {
  const {id} = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <Link href="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
