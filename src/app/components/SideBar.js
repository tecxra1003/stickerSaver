"use client"
import { Button, Menu } from "antd";
import { AppstoreOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from 'next/navigation'


export default function SideBar() {
    const [signOutLoader, setSignOutLoader] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const items = [

        {
            key: '/dashboard',
            label: 'Dashboard ',
            icon: <AppstoreOutlined />,

        },
        {
            key: '/dashboard/stickerFamily',
            label: 'Sticker Family',
            icon: <AppstoreOutlined />,

        },
        {
            key: '/dashboard/sticker',
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
        if (key == "/dashboard") {
            router.push("/dashboard")
        }
        else if (key == "/dashboard/sticker") {
            router.push("/dashboard/sticker")
        }
        else if (key == "/dashboard/stickerFamily") {
            router.push("/dashboard/stickerFamily")
        }
        else if (key == "signOut") {
            setSignOutLoader(true)
            signOut()

        }
        console.log("first")

    }
    return (


        <Menu
            onClick={({ key }) => onclick(key)}
            selectedKeys={pathname}
            mode="inline"
            items={items}
            className="h-full w-fit"
        >

        </Menu>



    )

}