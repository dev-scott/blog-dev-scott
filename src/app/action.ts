"use server"
import z from "zod"
import { postSchema } from "./schemas/blog"
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";


export async function createBlogAction(data: z.infer<typeof postSchema>) {


    try {

        const parsed = postSchema.safeParse(data)
        if (!parsed.success) {
            throw new Error("Something went wrong")
        }
        const token = await getToken()


        const imageUrl = await fetchMutation(api.post.generateImageUploadUrl, {}, { token })

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": parsed.data.image.type
            },
            body: parsed.data.image
        })

        if (!uploadResult.ok) {

            return {
                error: 'Failed to upload image '
            }

        }

        const { storageId } = await uploadResult.json();

        await fetchMutation(api.post.createPost, {
            body: parsed.data.content,
            title: parsed.data.title,
            imageStorageId: storageId
        }, { token })

    } catch (error) {
        return {
            error: 'Failed to create post '
        }


    }

    return redirect("/")
}