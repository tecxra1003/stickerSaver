"use client"
import CreateSticker from "@/app/components/createSticker";
import StickerCard from "@/app/components/stickerCard";
import { Button, ConfigProvider, FloatButton, Modal, Pagination, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Sticker() {
    let { data: session } = useSession()
    const [stickerData, setStickerData] = useState(null)
    const [totalStickers, setTotalStickers] = useState(null)
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [reload, setReload] = useState(false)

    const [limit, setLimit] = useState(20)
    async function getSticker() {
        setLoader(true)
        let Sticker = await fetch(`/api/sticker/getAll/${session.user.id}?limit=${limit}&page=${page - 1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })
        if (session.user.type == "User") {
            let TotalStickers = await fetch(`/api/getDashboardStats/stickersOfUser/${session.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': session.accessToken,
                },

            })

            setTotalStickers(await TotalStickers.json())
        }
        else {
            let TotalStickers = await fetch(`/api/getDashboardStats/stickers/${session.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': session.accessToken,
                },

            })
            setTotalStickers(await TotalStickers.json())
        }
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
    }, [page, limit, reload])
    function changePagination(page, pageSize) {
        setPage(page);
        setLimit(pageSize)

    }
    const showTotal = (total) => `Total ${total} items`;

    return (
        <div className="flex justify-center z-50">
            <Spin spinning={loader} size="large" fullscreen />
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
                <CreateSticker setIsOpen={setIsOpen} setReload={setReload} reload={reload} task={"Create"} />
            </Modal>

            <div className="flex mb-8  w-5/6 flex-wrap">

                {stickerData && stickerData.map(data => (
                    <div key={data._id}  >


                        <StickerCard name={data.name} image={data.image} id={data._id} setReload={setReload} reload={reload} stickerFamilyId={data.stickerFamilyId} />

                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="p-3 mt-5 flex justify-center  bg-white">
                    <Pagination defaultCurrent={page} total={totalStickers} pageSize={limit} showSizeChanger showTotal={showTotal} onChange={changePagination} />
                </div>
            </div>
        </div>
    )
}