import Navbar from "@/components/web/Navbar";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    return <main className="max-w-7xl mx-auto px-4 lg:px-8">
        <Navbar />
        {children}

    </main>
}