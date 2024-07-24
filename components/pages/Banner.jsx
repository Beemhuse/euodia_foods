import Image from "next/image";
import banner from "@/public/Frame 77.png"

const Banner = () => {
    return (
        <div className=" py-10 px-6 bg-white">
           <Image src={banner} />
        </div>
    );
};

export default Banner;
