"use client"
import CreateFamily from "@/app/components/createFamliy";
import FamilyCard from "@/app/components/familyCard";
import { Button, ConfigProvider, FloatButton, Modal, Pagination, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Stickerfamily() {
    let { data: session } = useSession()
    const [familiesData, setFamiliesData] = useState(null)
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [limit, setLimit] = useState(20)
    const [totalFamilies, setTotalFamilies] = useState(20)
    async function getStickerFamilies() {
        setLoader(true)
        let stickerFamilies = await fetch(`/api/stickerFamily/getAll?limit=${limit}&page=${page - 1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })
        let getFamiliesCount = await fetch("/api/getDashboardStats/stickerFamilies", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },

        })
        setTotalFamilies(await getFamiliesCount.json())
        setFamiliesData(await stickerFamilies.json())
        setLoader(false)
    }
    useEffect(() => {
        if (session && !familiesData) {
            getStickerFamilies()
        }
    }, [session])
    useEffect(() => {
        if (session) {
            getStickerFamilies()
        }
    }, [page, limit, reload])
    function changePagination(page, pageSize) {
        setLoader(true)
        setPage(page);
        setLimit(pageSize)
        setLoader(false)
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
                <CreateFamily setIsOpen={setIsOpen} task={"Create"} setReload={setReload} reload={reload} />
            </Modal>

            <div className="flex mb-8 w-5/6 flex-wrap">

                {familiesData && familiesData.map(data => (
                    <div key={data._id}  >


                        <FamilyCard name={data.name} thumbnail={data.thumbnail} id={data._id} />

                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="p-3 flex justify-center  bg-white">
                    <Pagination defaultCurrent={page} total={totalFamilies} pageSize={limit} showSizeChanger showTotal={showTotal} onChange={changePagination} />
                </div>
            </div>
        </div>
    )
}