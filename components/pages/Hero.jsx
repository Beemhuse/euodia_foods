import Image from "next/image";
import Button from "../reusables/buttons/Button";
import foodImage from "@/public/image 29.png"
import profilePic from "@/public/Frame 18.png"

const Hero = () => {
    return (
        <div className="flex items-center justify-between py-10 px-6 border border-red-400">
            <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-4">
                    Come For The <span className="bg-orange-400 text-white px-5 py-1 rounded-full">Food</span>
                </h1>
                <h2 className="text-2xl font-semibold mb-4">Stay For The Memory</h2>
                <p className="mb-6">
                    Food is what we eat to stay alive and healthy. It comes in many different forms and flavors, from fruits and vegetables to meats and grains.
                </p>
                <Button title='Order Now' color='accent'/>
                {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Order Now</button> */}
            </div>
            <div className="relative">
                <div className="relative h-80 w-80">
                    <Image src={foodImage} alt="Food" className="rounded-lg bg-orange-500" layout="fill" objectFit="cover" />
                </div>
               
            </div>
        </div>
    );
};

export default Hero;
