"use client"
import CreateFamily from "@/app/components/createFamliy";
import CreateSticker from "@/app/components/createSticker";
import DeleteDialog from "@/app/components/deleteDialoge";
import StickerCard from "@/app/components/stickerCard";
import { Avatar, Button, ConfigProvider, FloatButton, Modal, Pagination, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sticker({ params }) {
    let { data: session } = useSession()
    const router = useRouter()
    const [stickerData, setStickerData] = useState(null)
    const [reload, setReload] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    async function getSticker() {
        setLoader(true)
        let StickerFamily = await fetch(`/api/stickerFamily/getDetail/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })

        setStickerData(await StickerFamily.json())
        setLoader(false)
    }
    async function deleted() {
        let deleted = await fetch(`/api/stickerFamily/delete/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken
            }



        });
        setReload(!reload)
        router.replace("/dashboard/stickerFamily")
    }
    useEffect(() => {
        if (session && !stickerData) {
            getSticker()
        }
    }, [session])
    useEffect(() => {
        if (session) {
            getSticker()
        }
    }, [reload])




    return (
        <>
            <div className="flex justify-center  text-3xl p-2 text-center">
                <Spin spinning={loader} size="large" fullscreen />
                {stickerData && <div className="flex items-center border p-2 m-1 justify-between w-full">
                    <Avatar src={stickerData.thumbnail} size={80} />
                    <div> {stickerData.name}</div>

                    <div className="flex flex-col ">
                        <Button className="m-1" type="primary" onClick={() => setIsOpenUpdate(true)} >Edit Family</Button>
                        <Button className="m-1" type="primary" danger onClick={() => setIsDeleteOpen(true)} >Delete Family</Button>
                    </div>

                </div>}
                <Modal open={isDeleteOpen} onCancel={() => setIsDeleteOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose centered>
                    <DeleteDialog reload={reload} setReload={setReload} deleted={deleted} setIsDeleteOpen={setIsDeleteOpen} />
                </Modal>
                <Modal open={isOpenUpdate} onCancel={() => setIsOpenUpdate(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                    <CreateFamily task={"Update"} id={params.id} setIsOpen={setIsOpenUpdate} setReload={setReload} reload={reload} />
                </Modal>
            </div>
            <div className="flex justify-center z-50">

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#00CC22"
                        },
                    }}
                >
                    <FloatButton className="bottom-28 right-12" type="primary" onClick={() => setIsOpenCreate(true)} tooltip={<div>Create New Sticker </div>} />
                </ConfigProvider>
                <Modal open={isOpenCreate} onCancel={() => setIsOpenCreate(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                    <CreateSticker task={"Create"} setIsOpen={setIsOpenCreate} setReload={setReload} reload={reload} familyId={params.id} />
                </Modal>

                <div className="flex w-5/6 flex-wrap">

                    {stickerData && stickerData.stickers.filter((sticker) => sticker.isDeleted == false).map(data => (
                        <div key={data._id}  >


                            <StickerCard name={data.name} setReload={setReload} reload={reload} image={data.image} id={data._id} stickerFamilyId={data.stickerFamilyId} />

                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}