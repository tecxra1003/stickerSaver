import { Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { useState } from "react";

export default function CreateFamily() {
    const [imageUrl, setImageUrl] = useState([])
    const [fileList, setFileList] = useState([]);
    const props = {
        beforeUpload(file) {

            var reader = new FileReader();
            reader.onloadend = function () {
                setImageUrl(...imageUrl, reader.result)

            }
            reader.readAsDataURL(file);


        }
    }
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(imageUrl)
        console.log(fileList)
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div >
            <div className="text-center text-2xl font-semibold">
                Create A New Sticker Family
            </div>
            <div>
                <label className="block text-lg font-medium  text-gray-900">Name</label>
                <div className="my-2">
                    <input className="w-64 rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Name of sticker family" />
                </div>
            </div>
            <div>
                <label className="block text-lg font-medium  text-gray-900">Add Sticker</label>
                <div className="my-2">
                    <ImgCrop rotationSlider>
                        <Upload
                            {...props}

                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length <= 5 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
        </div >
    )
}