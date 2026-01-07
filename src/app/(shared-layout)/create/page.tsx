import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateRoute() {
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
                    <form>

                        
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}