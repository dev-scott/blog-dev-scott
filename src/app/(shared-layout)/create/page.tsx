'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useTransition } from "react";
import { start } from "repl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBlogAction } from "@/app/action";

export default function CreateRoute() {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const mutation = useMutation(api.post.createPost)

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            title: "",
            image: undefined,
        }
    })

    function onSubmit(data: z.infer<typeof postSchema>) {

        startTransition(async () => {

            console.log("this work on the client side")


            toast.success("Everything is ok ...")
            await createBlogAction(data)
        })


    }



    return (
        <div className="py-12 ">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Post</h1>
                <p className="mt-5 text-lg leading-8 text-muted-foreground" >Create your own post ...</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="">Create Post</CardTitle>
                    <CardDescription>Create your own post ...</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>

                            <Controller name="title" control={form.control} render={({ field, fieldState }) => {
                                return (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input aria-invalid={fieldState.invalid} placeholder="Enter the title" {...field} />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )
                            }} />
                            <Controller name="content" control={form.control} render={({ field, fieldState }) => {
                                return (
                                    <Field>
                                        <FieldLabel>Content</FieldLabel>
                                        <Textarea aria-invalid={fieldState.invalid} placeholder="Enter the content" {...field} />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )
                            }} />



                            <Controller name="image" control={form.control} render={({ field, fieldState }) => {
                                return (
                                    <Field>
                                        <FieldLabel>Image</FieldLabel>

                                        <Input aria-invalid={fieldState.invalid} placeholder="Super cool blog content" type="file" accept="image/*" onChange={(event) => {

                                            const file = event.target.files?.[0];
                                            field.onChange(file)

                                        }} />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )
                            }} />

                            <Button type="submit" disabled={isPending}>{isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>
                                    Create Post
                                </span>
                            )}</Button>                        </FieldGroup>

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}