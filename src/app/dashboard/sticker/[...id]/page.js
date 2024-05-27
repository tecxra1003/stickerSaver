"use client"
import CreateSticker from "@/app/components/createSticker";
import StickerCard from "@/app/components/stickerCard";
import { Button, ConfigProvider, FloatButton, Modal, Pagination, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Sticker({ params }) {
    let { data: session } = useSession()
    const [stickerData, setStickerData] = useState(null)
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [limit, setLimit] = useState(20)
    async function getSticker() {
        setLoader(true)
        let Sticker = await fetch(`/api/sticker/getAll/${params.id[1]}?limit=${limit}&page=${page - 1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })
        setStickerData(await Sticker.json())
        setLoader(false)
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
    }, [page, limit, isOpen])
    function changePagination(page, pageSize) {
        setLoader(true)
        setPage(page);
        setLimit(pageSize)
        setLoader(false)
    }
    return (
        <>
            <div className="flex justify-center underline text-3xl p-2 text-center">
                <Spin spinning={loader} size="large" fullscreen />
                <div>

                    {params.id[0]}
                </div>
            </div>
            <div className="flex justify-center z-50">

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#00CC22"
                        },
                    }}
                >
                    <FloatButton className="bottom-28 right-12" type="primary" onClick={() => setIsOpen(true)} tooltip={<div>Create New Sticker Family</div>} />
                </ConfigProvider>
                <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                    <CreateSticker setIsOpen={setIsOpen} />
                </Modal>

                <div className="flex w-5/6 flex-wrap">

                    {stickerData && stickerData.map(data => (
                        <div key={data._id}  >


                            <StickerCard name={data.name} image={data.image} id={data._id} stickerFamilyId={data.stickerFamilyId} />

                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <div className="p-3 flex justify-center  bg-white">
                        <Pagination defaultCurrent={page} pageSize={limit} total={500} onChange={changePagination} />
                    </div>
                </div>
            </div>
        </>
    )
}