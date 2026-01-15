
import { api } from "../../../../convex/_generated/api"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
 
export const dynamic = "force-static"
export const revalidate = 30



export default function BlogPage() {
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights , thoughts , and trend from our team.
                </p>

            </div>
            <Suspense fallback={
                <SkeletonLoadingUi />
            }>

                <LoadingBlogList />
            </Suspense>

        </div>
    )
}

async function LoadingBlogList() {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const data = await fetchQuery(api.post.getPosts)

    return (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {data?.map((post) => (
                <Card key={post._id} className="pt-0">

                    <div className=" relative h-48 w-full overflow-hidden">

                        <Image className="rounded-t-lg object-cover" src={post.imageUrl ?? "https://images.unsplash.com/photo-1761839258605-d1b118266ccc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="image" fill />

                    </div>

                    <CardContent>

                        <Link href={`/blog/${post._id}`}>
                            <h1 className="text-2xl  font-bold hover:text-primary">{post.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-2 mt-2">
                            {post.body}
                        </p>

                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({
                            className: "w-full"
                        })} href={`/blog/${post._id}`}>
                            Read more
                        </Link>
                    </CardFooter>

                </Card>
            ))}

        </div>

    )


}


function SkeletonLoadingUi() {
    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div className="flex flex-col space-y-3 " key={i}>
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <div className=" space-y-2 flex flex-col">

                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}