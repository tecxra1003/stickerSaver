import { Avatar, Button, Checkbox, Radio, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DeleteOutlined } from '@ant-design/icons';


export default function CreateFamily({ setIsOpen, setReload, reload, task, id }) {
    const { data: session } = useSession()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [thumbnail, setThumbnail] = useState();
    const [thumbnailImage, setThumbnailImage] = useState();
    const [imageUrl, setImageUrl] = useState([])
    async function getFamilyData() {
        setLoader(true)
        let StickerFamily = await fetch(`/api/stickerFamily/getDetail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        StickerFamily = await StickerFamily.json()
        setName(StickerFamily.name)
        setImageUrl(StickerFamily.stickers.filter((sticker) => sticker.isDeleted == false).map(data => data.image))
        setThumbnailImage(StickerFamily.thumbnail)
        setLoader(false)
    }
    useEffect(() => {
        if (session && task == "Update") {
            getFamilyData()
        }
    }, [session])
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
        else if (task == "Create" && imageUrl.length < 2) {
            setError("select Atleast 2 stickers")
            return
        }
        else if (thumbnail == null && task == "Create") {
            setError("Select a thumbnail")
            return
        }
        setLoader(true)
        if (task == "Create") {
            let createdFamily = await fetch('/api/stickerFamily/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },

                body: JSON.stringify({
                    name: name,
                    thumbnail: imageUrl[thumbnail],
                    stickerImage: imageUrl,
                    userId: session.user.id,
                    isCustom: session.user.type == "Admin" ? false : true

                }),
            });
        }
        if (task == "Update") {
            let StickerFamily = await fetch(`/api/stickerFamily/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    id: id,
                    thumbnail: thumbnail ? imageUrl[thumbnail] : thumbnailImage,


                }),
            })
        }
        setReload(!reload)
        setIsOpen(false)
        setLoader(false)
    }
    function selectThumbnail(e) {
        setThumbnail(e.target.value)
    }

    function filterImage(index) {
        setImageUrl(imageUrl.filter((image, Index) => Index != index).map((image) => image))
    }
    return (
        <div >
            <Spin spinning={loader} >

                <div className="text-center text-2xl font-semibold">
                    {task} Family
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
                        {imageUrl.length < 5 && task == "Create" && <input onChange={saveImage} type="file" />}
                    </div>

                    {/* <Radio.Group onChange={selectThumbnail} > */}
                    <div className="flex  flex-wrap justify-center  ">

                        {imageUrl &&
                            imageUrl.map((image, index) => (
                                <div key={index} className="flex p-1 m-1 border justify-around" >

                                    <Checkbox onChange={selectThumbnail} value={index} checked={index == thumbnail}
                                        name="stickers" ><Avatar src={image} size={60} /></Checkbox>
                                    {task == "Create" && <Button className="m-3 border-none" onClick={() => filterImage(index)}><DeleteOutlined /></Button>}
                                </div>
                            )
                            )
                        }
                    </div>
                    {/* </Radio.Group> */}
                </div>
                <Button onClick={CreateFamily}>{task} Family</Button>
                {error &&
                    <div className="bg-red-500 flex w-fit border rounded-md p-1 my-2"> {error}</div>
                }
            </Spin>
        </div >
    )
}