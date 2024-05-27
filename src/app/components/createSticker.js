import { Avatar, Button, Radio, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CreateSticker({ setIsOpen }) {
    const { data: session } = useSession()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    const [stickerFamilyId, setStickerFamilyId] = useState("")
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
        console.log(stickerFamilies)
    }, [session])
    async function getStickerFamilies() {
        let families = await fetch(`/api/stickerFamily/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken,
            },
        })

        setStickerFamilies(await families.json())

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


        console.log(imageUrl)
        setLoader(true)

        let createdSticker = await fetch('/api/sticker/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken
            },

            body: JSON.stringify({
                name: name,
                image: imageUrl,
                stickerFamilyId: stickerFamilyId,

            }),
        });
        setLoader(false)

        setIsOpen(false)
    }



    return (
        <div >
            <Spin spinning={loader} >

                <div className="text-center text-2xl font-semibold">
                    Create A New Sticker
                </div>
                <div>
                    <label className="block text-lg font-medium  text-gray-900">Name</label>
                    <div className="my-2">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-64 rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Name of sticker (opional)" />
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-medium  text-gray-900">Add Sticker </label>
                    <div className="my-2">
                        {<input onChange={saveImage} type="file" />}
                    </div>
                    <label className="block text-lg font-medium  text-gray-900">Select Sticker Family </label>
                    <select value={stickerFamilyId} onChange={(e) => setStickerFamilyId(e.target.value)}>
                        <option disabled value="">--select a family--</option>
                        {stickerFamilies && stickerFamilies.map((family) => (
                            <option key={family._id} value={family._id}>{family.name}</option>
                        ))}
                    </select>

                    <div className="flex flex-row ">



                        {imageUrl && <Avatar src={imageUrl} size={60} />}

                    </div>
                    <Button onClick={createSticker}>Upload Sticker</Button>
                </div>
                {error &&
                    <div className="bg-red-500 flex w-fit border rounded-md p-1 my-2"> {error}</div>
                }
            </Spin>
        </div >
    )
}