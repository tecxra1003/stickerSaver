"use client"
import { useState } from "react";
import Link from "next/link";
import { Avatar } from "antd";




export default function Navbar() {
    const [namesInitial, setNamesInitial] = useState("AM")
 





  




    return (
        <nav className="flex  bg-blue-500 text-cyan-50 justify-between w-screen left-0 right-0 top-0  z-50">
            <Link href={"/dashboard"}>

                <p className="flex text-5xl p-3 ">Sticker Saver</p>
            </Link>
            <div className="flex "> </div>
            <div className="flex ">

            
                    <div className="flex justify-center text-center mr-2">

                        <div className="relative z-50">
                            <div>

                                <div className=" flex justify-center m-3 border-white">
                                  <Avatar size={60}>{namesInitial.toUpperCase()}</Avatar>

                                 



                                </div>
                            </div>

                        </div>
                    </div>
                

            </div>

        </nav >
    )
}