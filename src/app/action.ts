"use server"
import z from "zod"
import { postSchema } from "./schemas/blog"
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
 

export async function createBlogAction(data: z.infer<typeof postSchema>){

    const parsed = postSchema.safeParse(data)
    if(!parsed.success){
        throw new Error("Something went wrong")
    }
const token = await getToken()
    await fetchMutation(api.post.createPost, {
        body: parsed.data.content,
        title: parsed.data.title,
    },{token})
    return redirect("/")
}