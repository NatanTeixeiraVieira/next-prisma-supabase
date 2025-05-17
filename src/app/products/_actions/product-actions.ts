"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Validation schema
const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
})

type ProductFormData = z.infer<typeof ProductSchema>

// Create a new product
export async function createProduct(formData: FormData) {
  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, price } = validatedFields.data

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    })

    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    return { error: "Failed to create product" }
  }
}

// Get all products
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return products
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}

// Get a single product by ID
export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })
    return product
  } catch (error) {
    throw new Error("Failed to fetch product")
  }
}

// Update a product
export async function updateProduct(id: string, formData: FormData) {
  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, price } = validatedFields.data

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
      },
    })

    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update product" }
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete product" }
  }
}
