"use client"
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useSession } from 'next-auth/react';
export default function Layout({ children }) {
    const { data: session } = useSession()
    return (



        <div className='flex flex-col'>

            <div className=''>

                <Navbar />
            </div>
            <div className='flex flex-row '>
                <div className={`${session ? "" : "hidden"} h-screen`} >

                    <SideBar />
                </div>
                <div className=' w-full'>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>

    );
}