"use client"
import { Avatar, Card, Image, Modal } from "antd"
import Meta from "antd/es/card/Meta"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteDialoge from "./deleteDialoge";
import CreateSticker from "./createSticker";
export default function StickerCard({ name, image, id, stickerFamilyId, reload, setReload }) {
    const { data: session } = useSession()
    const [familyData, setFamilyData] = useState()
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    async function getFamily() {

        const family = await fetch(`/api/stickerFamily/getDetail/${stickerFamilyId}`, {
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
        setIsDeleteOpen(true)
    }
    async function deleted() {
        let deleted = await fetch(`/api/sticker/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken
            }



        });
        setReload(!reload)
    }
    function updateSticker() {
        setIsUpdateOpen(true)
    }
    return (

        <div>
            {familyData && session &&
                <div>

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



                    </Card>
                    <Modal open={isDeleteOpen} onCancel={() => setIsDeleteOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose centered
                    >
                        <DeleteDialoge setIsDeleteOpen={setIsDeleteOpen} deleted={deleted} accessToken={session.accessToken} id={id} />
                    </Modal>
                    <Modal open={isUpdateOpen} onCancel={() => setIsUpdateOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                        <CreateSticker setReload={setReload} reload={reload} setIsOpen={setIsUpdateOpen} task={"Update"} id={id} />
                    </Modal>
                </div>
            }
        </div >
    )
}