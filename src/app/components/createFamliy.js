import { Avatar, Button, Radio, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CreateFamily({ setIsOpen }) {
    const { data: session } = useSession()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [thumbnail, setThumbnail] = useState("");
    const [imageUrl, setImageUrl] = useState([])
    function saveImage(e) {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImageUrl([...imageUrl, reader.result])

        }
        reader.readAsDataURL(file);


    }

    async function CreateFamily() {
        setError("")
        if (!name) {
            setError("please enter name")
            return
        }
        else if (imageUrl.length < 2) {
            setError("select Atleast 2 stickers")
            return
        }
        else if (!thumbnail) {
            setError("Select a thumbnail")
            return
        }
        console.log(imageUrl)
        setLoader(true)
        let createdFamily = await fetch('/api/stickerFamily/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': session.accessToken
            },

            body: JSON.stringify({
                name: name,
                thumbnail: imageUrl[thumbnail],
                stickerImage: imageUrl,

            }),
        });
        setIsOpen(false)
        setLoader(false)
    }
    function selectThumbnail(e) {
        console.log(e.target.value)
        setThumbnail(e.target.value)
    }


    return (
        <div >
            <Spin spinning={loader} >

                <div className="text-center text-2xl font-semibold">
                    Create A New Sticker Family
                </div>
                <div>
                    <label className="block text-lg font-medium  text-gray-900">Name</label>
                    <div className="my-2">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-64 rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Name of sticker family" />
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-medium  text-gray-900">Add Sticker (2-5)</label>
                    <div className="my-2">
                        {imageUrl.length < 5 && <input onChange={saveImage} type="file" />}
                    </div>

                    <div className="flex flex-row ">
                        <Radio.Group onChange={selectThumbnail} >

                            {imageUrl &&
                                imageUrl.map((image, index) => (
                                    <div key={index} >

                                        <Radio value={index} name="stickers" ><Avatar src={image} size={60} /></Radio>

                                    </div>
                                )
                                )
                            }
                        </Radio.Group>
                    </div>
                    <Button onClick={CreateFamily}>Upload Family</Button>
                </div>
                {error &&
                    <div className="bg-red-500 flex w-fit border rounded-md p-1 my-2"> {error}</div>
                }
            </Spin>
        </div >
    )
}