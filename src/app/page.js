import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
export default function Home() {
  return (

    <div className=" ">
      <Navbar />
      <div className=" flex items-center justify-center ">

        <SignIn />

      </div>
    </div>
  );
}
