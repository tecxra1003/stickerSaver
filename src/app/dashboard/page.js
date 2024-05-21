"use client"

import { useSession } from "next-auth/react"



export default function dashboard() {
    const { data: session } = useSession()

    return (
        <div className="bg-green-700 flex justify-center place-items-center mt-40">
            <div>
                coming soon
            </div>
        </div>
    )


}