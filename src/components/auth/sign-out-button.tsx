"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
    return (
        <Button 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            <LogOut className="h-4 w-4" />
            Sign Out
        </Button>
    )
}
