

"use client"

import { Card, Spin } from "antd"
import { useSession } from "next-auth/react"
import { headers } from "../../../next.config"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [stickerFamilies, setStickerFamilies] = useState()
    const [stickers, setStickers] = useState()
    const [stickerOfUser, setStickerOfUser] = useState(null)
    const [loader, setLoader] = useState(false)
    const { data: session } = useSession()
    async function fetchCountOfStickers() {
        setLoader(true)
        if (session.user.type == "Admin") {
            let getStickerFamilies = await fetch("/api/getDashboardStats/stickerFamilies", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': session.accessToken,
                },

            })
            setStickerFamilies(await getStickerFamilies.json())
            let getStickers = await fetch("/api/getDashboardStats/stickers", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': session.accessToken,
                },

            })
            setStickers(await getStickers.json())
        }
        let getStickerOfUser = await fetch("/api/getDashboardStats/stickersOfUser", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },

        })
        setStickerOfUser(await getStickerOfUser.json())
        setLoader(false)

    }
    useEffect(() => {

        if (session && stickerOfUser == null) {

            fetchCountOfStickers()
        }


    }, [session])




    return (
        <div>
            <Spin spinning={loader} size="large" fullscreen />


            {stickerOfUser != null &&
                <div className="flex">
                    {session && session.user.type == "Admin" &&
                        <div>

                            <div className="m-2">

                                <Card className="m-2 h-28 w-80 bg-gray-100">
                                    <div className="text-lg">
                                        Sticker Families
                                    </div>
                                    <div className="text-3xl">
                                        {stickerFamilies}
                                    </div>
                                    <div className="text-blue-300">
                                        {stickers} Stickers
                                    </div>
                                </Card>
                            </div>
                            <div className="m-2">

                                <Card className="m-2 h-28 w-80 bg-gray-100">
                                    <div className="text-lg">
                                        Stickers
                                    </div>
                                    <div className="text-3xl">
                                        {stickers}
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
                                {stickerOfUser}
                            </div>

                        </Card>
                    </div>
                </div>
            }
        </div >
    )


}