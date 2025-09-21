import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import RiveCharacter from "@/components/RiveCharacter";

export default function AuthFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10 min-h-svh">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center relative w-full max-w-sm mx-auto ">
        <div className="w-lg aspect-square -mt-56">
          <RiveCharacter />
        </div>
        <div className="shrink-0 w-full -mt-30">{children}</div>
      </div>
    </div>
  );
}
