import { buttonVariants } from "@/components/ui/button";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { PostPresence } from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface PostIdRouteProps {
    params: Promise<{
        postId: Id<'posts'>
    }>
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {

    const { postId } = await params;
    const token = await getToken()

    const [post, preloadedComments, userId] = await Promise.all(

        [


            await fetchQuery(api.post.getPostById, { postId }),

            await preloadQuery(api.comment.getCommentsByPost, { postId }),

            await fetchQuery(api.presence.getUserId, {}, { token }),

        ]
    )

    if(!userId){
        return redirect("/auth/login")
    }

    if (!post) {
        return (
            <div>
                <h1 className="text-6xl font-extrabold text-red-500 p-20">
                    No post found
                </h1>
            </div>
        )
    }


    return (
        <div className="max-w-3xl mx-auto py-5 px-4 animate-in fade-in duration-500 relative">

            <Link href="/blog" className={buttonVariants({ variant: "outline", className: "mb-5" })}>
                <ArrowLeftIcon className="w-6 h-6" />
                Back to blog
            </Link>

            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm ">

                <Image src={post.imageUrl ?? ""} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />

            </div>

            <div className="spacey-4 flex flex-col ">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    {post.title}
                </h1>

                <div className="flex items-center gap-2">

                    <p className=" text-sm text-muted-foreground">
                        Posted on : {new Date(post._creationTime).toDateString()}
                    </p>
                    {userId && <PostPresence roomId={post._id} userId={userId} />}
                </div>


            </div>
            <Separator className="my-8" />
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {post.body}
            </p>
            <Separator className="my-8" />

            <CommentSection preloadedComments={preloadedComments} />

        </div>
    )
}