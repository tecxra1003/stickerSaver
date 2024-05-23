

"use client"

import { Card } from "antd"
import { useSession } from "next-auth/react"
import { headers } from "../../../next.config"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [count, setCount] = useState()
    const { data: session } = useSession()
    async function fetchCountOfStickers() {
        let newCount = await fetch("/api/sticker/getTotal", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },

        })
        setCount(await newCount.json())
        console.log(count)
    }
    useEffect(() => {

        if (session) {

            fetchCountOfStickers()
        }


    }, [session])




    return (
        <div>

            {count &&
                <div className="flex">
                    {session.user.type == "Admin" &&
                        <div>

                            <div className="m-2">

                                <Card className="m-2 h-28 w-80 bg-gray-100">
                                    <div className="text-lg">
                                        Sticker Families
                                    </div>
                                    <div className="text-3xl">
                                        {count.totalFamilies}
                                    </div>
                                    <div className="text-blue-300">
                                        {count.total} Stickers
                                    </div>
                                </Card>
                            </div>
                            <div className="m-2">

                                <Card className="m-2 h-28 w-80 bg-gray-100">
                                    <div className="text-lg">
                                        Stickers
                                    </div>
                                    <div className="text-3xl">
                                        {count.total}
                                    </div>

                                </Card>
                            </div>
                        </div>}
                    <div className="">

                        <Card className="m-2 h-28 w-80 bg-gray-100">
                            <div className="text-lg">
                                My Stickers
                            </div>
                            <div className="text-3xl">
                                {count.totalOfUser}
                            </div>

                        </Card>
                    </div>
                </div>
            }
        </div >
    )


}