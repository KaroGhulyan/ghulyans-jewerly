"use client"

import { SessionProvider } from "next-auth/react"
import { LoginModalProvider } from "@/hooks/use-login-modal"
import { LoginModal } from "@/components/auth/login-modal"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LoginModalProvider>
                {children}
                <LoginModal />
            </LoginModalProvider>
        </SessionProvider>
    )
}
