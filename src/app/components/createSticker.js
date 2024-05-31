import { Avatar, Button, Radio, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export default function CreateSticker({ setIsOpen, task, id, reload, setReload, familyId }) {
    const { data: session } = useSession()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    const [stickerFamilyId, setStickerFamilyId] = useState(familyId ? familyId : "")
    const [stickerFamilies, setStickerFamilies] = useState()
    function saveImage(e) {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImageUrl(reader.result)

        }
        reader.readAsDataURL(file);


    }
    useEffect(() => {
        getStickerFamilies()
        if (task == "Update") { getSticker() }
    }, [session])
    async function getStickerFamilies() {
        let families = await fetch(`/api/stickerFamily/getAll/${session.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setStickerFamilies(await families.json())

    }
    async function getSticker() {
        setLoader(true)
        let sticker = await fetch(`/api/sticker/getDetail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        sticker = (await sticker.json())
        setImageUrl(sticker?.image)
        setName(sticker?.name)
        setStickerFamilyId(sticker.stickerFamilyId)
        setLoader(false)

    }
    async function createSticker() {
        setError("")

        if (!imageUrl) {
            setError("please select an image")
            return


        }
        else if (!stickerFamilyId) {
            setError("Please Select A Sticker Family")
            return
        }


        setLoader(true)

        if (task == "Create") {
            let createdSticker = await fetch('/api/sticker/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name: name,
                    image: imageUrl,
                    stickerFamilyId: stickerFamilyId,
                    userId: session.user.id,
                    isCustom: session.user.type == "Admin" ? false : true
                }),
            });
        }
        else {
            let updateSticker = await fetch('/api/sticker/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: id,
                    name: name,
                    image: imageUrl,
                    stickerFamilyId: stickerFamilyId,

                }),
            });
        }
        setReload(!reload)
        setLoader(false)

        setIsOpen(false)
    }



    return (
        <div >
            <Spin spinning={loader} >

                <div className="text-center text-2xl font-semibold">
                    {task} Sticker
                </div>

                <div className="m-2 ">
                    <label className="block text-lg font-medium  text-gray-900">Name</label>
                    <div className="my-2">
                        <input value={name ? name : ""} onChange={(e) => setName(e.target.value)} className="w-64 rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Name of sticker (opional)" />
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium  text-gray-900">Select Sticker Family </label>
                    <select value={stickerFamilyId} onChange={(e) => setStickerFamilyId(e.target.value)}>
                        <option disabled value="">--select a family--</option>
                        {stickerFamilies && stickerFamilies.map((family) => (
                            <option key={family._id} value={family._id}>{family.name}</option>
                        ))}
                    </select>

                    {!imageUrl &&
                        <div>
                            <label className="block text-lg font-medium  text-gray-900">Add Sticker </label>
                            <div className="my-2">
                                {<input onChange={saveImage} type="file" />}
                            </div>
                        </div>
                    }
                    <div className="flex flex-row ">



                        {imageUrl && <div className="border rounded-sm my-2">
                            <Avatar src={imageUrl} size={60} />
                            <button className="m-2"><DeleteOutlined onClick={() => { setImageUrl(null) }} /></button>
                        </div>
                        }
                    </div>
                    <Button onClick={createSticker}>{task} Sticker</Button>
                </div>
                {error &&
                    <div className="bg-red-500 flex w-fit border rounded-md p-1 my-2"> {error}</div>
                }
            </Spin>
        </div >
    )
}