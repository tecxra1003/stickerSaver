"use client"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "antd";




export default function navbar() {
    const [umenu, setUmenu] = useState("hidden");
    let { data: session } = useSession();
    const [namesInitial, setNamesInitial] = useState("AM")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        url: ""
    })
    const [loading, setLoading] = useState(false)



    const signout = () => {
        setLoading(true)
        signOut()//nextauth signOut function
    }




    const handleUmenu = () => {

        umenu == "hidden" ? setUmenu("") : setUmenu("hidden");
    }




    return (
        <nav className="flex bg-blue-500 text-cyan-50 justify-between fixed left-0 right-0 top-0  z-50">
            <Link href={"/dashboard"}>

                <p className="flex text-5xl p-3 ">Sticker Saver</p>
            </Link>
            <div className="flex "> </div>
            <div className="flex ">

                {user && session &&
                    <div className="flex justify-center text-center mr-2">

                        <div className="relative z-50">
                            <div>
                                <button type="primary" onClick={handleUmenu} className="m-3  flex  " >

                                    <div className=" flex justify-center border-white">
                                        {user?.url == "" && <Avatar size={60}>{namesInitial.toUpperCase()}</Avatar>}

                                        {user?.url && <Avatar size={60} src={user?.url} />}



                                    </div>
                                </button>
                            </div>
                            <div className={`absolute ${umenu} right-0 border border-gray-300 z-10 w-28 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 `} >


                                <Link href={"/dashboard"} className="block px-1 py-2 text-sm text-gray-700">
                                    <Button onClick={() => setUmenu("hidden")} type="submit" className="block  py-2 text-sm text-gray-700">

                                        Dashboard
                                    </Button>

                                </Link>

                                <hr />

                                <Link href={""} className="block  py-2 px-1 text-sm text-gray-700">
                                    <Button onClick={() => setUmenu("hidden")} type="submit" className="block  py-2 text-sm text-gray-700">
                                        Profile
                                    </Button>

                                </Link>

                                <hr />

                                <Link href={""} className="block  py-2 px-1 text-sm text-gray-700">
                                    <Button onClick={() => signout()} type="submit" className="block  py-2 text-sm text-gray-700" loading={loading}>
                                        Sign Out
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    // </div>
                }

            </div>

        </nav >
    )
}