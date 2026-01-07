"use client"
import { loginSchema } from "@/app/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
export default function Login() {

    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {

            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("You have been logged in")
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
                    Login
                </CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FieldGroup className="gap-y-4">

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
                                Login
                            </span>
                        )}</Button>
                    </FieldGroup>





                </form>
            </CardContent>
        </Card>
    )
}   