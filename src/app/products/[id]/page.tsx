import { getProduct } from "../_actions/product-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatCurrency } from "@/utils/currency"

type ProductDetailPageProps = { params: Promise<{ id: string }> }

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const {id} = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <div className="flex gap-2">
          <Link href={`/products/${product.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
            <p>{product.description || "No description provided"}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Price</h3>
            <p className="text-xl font-bold">{formatCurrency(product.price)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Created</h3>
              <p>{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Last Updated</h3>
              <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
