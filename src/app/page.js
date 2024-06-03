import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import dbConnect from "./lib/mongodb";
export default function Home() {
  dbConnect()

  return (

    <div className=" ">
      <Navbar />
      <div className=" flex items-center justify-center ">

        <SignIn />

      </div>
    </div>
  );
}
