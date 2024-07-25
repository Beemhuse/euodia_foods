import Image from "next/image";
import banner from "@/public/Frame 78.png"

const Banner = () => {
    return (
        <div className="mx-4 bg-white">
           <Image src={banner} />
        </div>
    );
};

export default Banner;
