"use client";
import Image from "next/image";
import Button from "./button";

export default function NavBar() {
  return (
    <nav className="max-w-7xl mx-auto my-6 px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image src="/logo.svg" alt="EcoTricity Logo" width={80} height={32} className="h-8 w-auto" priority />
          </div>
        </div>
        <div className="flex h-full items-center gap-6">
          <a href="/contact" className="text-base font-bold hover:underline mt-4">Contact Us</a>
          <Button onClick={() => { /* TODO: add logout logic LATER */ }}>Log Out</Button>
        </div>
      </div>
    </nav>
  );
}
