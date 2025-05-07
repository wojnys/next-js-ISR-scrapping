"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">WebProducts Catalog</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                        Catalog of Products
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                        Products
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    );
}
