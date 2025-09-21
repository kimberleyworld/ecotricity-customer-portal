import Image from "next/image";
import ResourceCards from "@/components/resourceCards";
import NavBar from "@/components/navBar";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <ResourceCards />
    </div>
  );
}
