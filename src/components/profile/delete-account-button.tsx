"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function DeleteAccountButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteAccount = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/user", {
                method: "DELETE",
            })

            if (response.ok) {
                // Sign out after deletion
                signOut({ callbackUrl: "/" })
            } else {
                console.error("Failed to delete account")
            }
        } catch (error) {
            console.error("DELETE_ACCOUNT_ERROR", error)
        } finally {
            setIsLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <>
            <Button
                variant="ghost"
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center gap-2 text-sm"
                onClick={() => setIsOpen(true)}
            >
                <Trash2 className="h-4 w-4" />
                Delete Account
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <DialogTitle className="text-center text-xl">Delete Account?</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            This action is permanent and cannot be undone. All your favorites and account data will be permanently removed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-3 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete Permanently"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
