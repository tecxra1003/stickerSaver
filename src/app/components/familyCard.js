"use client"
import { Avatar, Card, Image } from "antd"
import Meta from "antd/es/card/Meta"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function FamilyCard({ name, thumbnail, id }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [familyData, setFamilyData] = useState()
    async function getFamily() {

        const family = await fetch(`/api/stickerFamily/getDetail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })
        setFamilyData(await family.json())
    }
    useEffect(() => {
        if (session && !familyData) {
            getFamily()
        }
    }, [session])

    return (

        <div>
            {session && familyData && <Card
                onClick={() => { router.push(`/dashboard/sticker/${id}`) }}
                className="m-2 z-30"
                hoverable
                style={{
                    width: 240,

                }}

            // cover={<img alt="example" src={thumbnail} className="w-60 h-60" />}
            >

                <Meta
                    title={name}
                    avatar={<Avatar src={thumbnail} size={70} />}
                    description={`Stickers: ${familyData?.stickers.filter((sticker) => sticker.isDeleted == false).map(data => data).length}`}
                />


            </Card>}
        </div>
    )
}