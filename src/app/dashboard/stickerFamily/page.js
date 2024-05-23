"use client"
import CreateFamily from "@/app/components/createFamliy";
import FamilyCard from "@/app/components/familyCard";
import { Button, ConfigProvider, FloatButton, Modal, Pagination } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Stickerfamily() {
    let { data: session } = useSession()
    const [familiesData, setFamiliesData] = useState(null)
    const [page, setPage] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [limit, setLimit] = useState(10)
    async function getStickerFamilies() {
        let stickerFamilies = await fetch(`/api/stickerFamily/getAll?limit=${limit}&page=${page - 1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })
        setFamiliesData(await stickerFamilies.json())

    }
    useEffect(() => {
        if (session) {
            getStickerFamilies()
            console.log(familiesData)
        }
    }, [session, page, limit])
    function changePagination(page, pageSize) {
        setPage(page);
        setLimit(pageSize)

    }
    return (
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
                <CreateFamily />
            </Modal>

            <div className="flex w-5/6 flex-wrap">

                {familiesData && familiesData.map(data => (
                    <div key={data._id}  >


                        <FamilyCard name={data.name} />

                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="p-3 flex justify-center  bg-white">
                    <Pagination defaultCurrent={page} total={500} onChange={changePagination} />
                </div>
            </div>
        </div>
    )
}