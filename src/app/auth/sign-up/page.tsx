"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SignUp() {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    function onSubmit(data: z.infer<typeof signUpSchema>) {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("You have been sign up")
                        router.push("/")
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
        })

    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Sign Up
                </CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FieldGroup className="gap-y-4">
                        <Controller name="name" control={form.control} render={({ field, fieldState }) => {
                            return (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Dev scott" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )
                        }} />
                        <Controller name="email" control={form.control} render={({ field, fieldState }) => {
                            return (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="devscott@gmail.com" type="email" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )
                        }} />
                        <Controller name="password" control={form.control} render={({ field, fieldState }) => {
                            return (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Dev scott" type="password" {...field} />
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
                                Sign Up
                            </span>
                        )}</Button>
                    </FieldGroup>





                </form>
            </CardContent>
        </Card>
    )
}