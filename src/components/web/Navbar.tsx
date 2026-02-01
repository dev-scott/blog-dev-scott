"use client"

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export default function Navbar() {

    const { isAuthenticated, isLoading } = useConvexAuth();

    const router = useRouter()

    return (
        <nav className="w-full py-5 flex items-center justify-between">

            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold ">Dev.<span className="text-primary">Scott</span></h1>
                </Link>
                <div className="flex items-center gap-2">

                    {/* <Link href="/" className={buttonVariants({ variant: "ghost" })}>Home</Link> */}
                    <Link href="/blog" className={buttonVariants({ variant: "outline" })}>The blog</Link>
                    <Link href="/create" className={buttonVariants({ variant: "outline" })}>Create a blog</Link>

                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
                {
                    isLoading ? (
                        <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    ) : (
                        isAuthenticated ? (
                            // <div>

                            // <Link href="/auth/sign-up" className={buttonVariants()}>Sign up</Link>
                            // <Link href="/auth/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
                            // </div>
                            <>
                                <Link href="/auth/profile" className={buttonVariants()}>Profile</Link>
                                <Button variant="outline" onClick={() => authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            toast.success("You have been signed out")
                                            router.push("/")
                                        },
                                        onError: (error) => {
                                            toast.error(error.error.message)
                                        }
                                    }
                                })}>Logout</Button>
                            </>
                        ) : (
                            <>

                                <Link href="/auth/sign-up" className={buttonVariants()}>Sign up</Link>
                                <Link href="/auth/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
                            </>
                        )
                    )
                }

                <ThemeToggle />

            </div>



        </nav>
    )
}