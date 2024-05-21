import Image from "next/image";
import SignIn from "./components/Signin";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">

      <div className=" ">

        <SignIn />

      </div>
    </div>
  );
}
