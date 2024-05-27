"use client"
import { Button, Menu } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";


export default function SideBar() {
    const [signOutLoader, setSignOutLoader] = useState(false)
    const router = useRouter()
    const items = [

        {
            key: 'dashboard',
            label: 'Dashboard ',
            icon: <AppstoreOutlined />,

        },
        {
            key: 'stickerFamily',
            label: 'Sticker Family',
            icon: <AppstoreOutlined />,

        },
        {
            key: 'sticker',
            label: 'Sticker ',
            icon: <AppstoreOutlined />,

        },
        {
            type: 'divider',
        },

        {
            key: 'signOut',
            label: (
                <Button type="primary" loading={signOutLoader}>Sign Out</Button>
            ),

        },
    ];

    const onclick = (key) => {
        if (key == "dashboard") {
            router.push("/dashboard")
        }
        else if (key == "sticker") {
            router.push("/dashboard/sticker")
        }
        else if (key == "stickerFamily") {
            router.push("/dashboard/stickerFamily")
        }
        else if (key == "signOut") {
            setSignOutLoader(true)
            signOut()

        }

    }
    return (


        <Menu
            onClick={({ key, keyPath, domEvent }) => onclick(key)}

            mode="inline"
            items={items}
            className="h-full w-fit"
        >

        </Menu>



    )

}