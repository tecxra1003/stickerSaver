"use client"
import { Avatar, Card, Image } from "antd"
import Meta from "antd/es/card/Meta"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
export default function StickerCard({ name, image, id, stickerFamilyId }) {
    const { data: session } = useSession()
    const [familyData, setFamilyData] = useState()
    async function getFamily() {

        const family = await fetch(`/api/stickerFamily/getSingle/${stickerFamilyId}`, {
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
    function deleteSticker() {
        console.log("deleted")
    }
    function updateSticker() {
        console.log("edited")
    }
    return (

        <div>
            {familyData &&
                <Card
                    className="m-2 z-30"
                    hoverable
                    style={{
                        width: 240,

                    }}

                    title={name ? name : "Name"}
                    extra={<div className="flex flex-row">
                        <div className="px-2">
                            <EditOutlined onClick={updateSticker} />
                        </div>
                        <div className="px-2">
                            <DeleteOutlined onClick={deleteSticker} />
                        </div>
                    </div>}
                >

                    <Meta
                        avatar={<Avatar src={image} size={70} />}
                        description={`Family Name: ${familyData.name}`}
                    />



                </Card>}
        </div >
    )
}