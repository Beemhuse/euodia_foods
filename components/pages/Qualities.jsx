import Image from 'next/image';
import mealImage from "@/public/meal.png"

const quality = [
    {
        title: "Convenient and Reliable",
        description: "Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.",
        icon: "/Frame 35.png"
    },
    {
        title: "Variety of Options",
        description: "From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.",
        icon: "/Frame 36.png"
    },
    {
        title: "Fresh Ingredients",
        description: "We use only the freshest ingredients, sourced locally whenever possible.",
        icon: "/Frame 37.png"
    }
];

const Qualities = () => {
    return (
        <div className="py-8 flex justify-between bg-white">
            <div className="flex-1 ">
                <Image src={mealImage} alt="mealImage" className='rounded-lg' layout="responsive" />
            </div>
            <div className="flex-1 px-4">
                <h2 className="text-5xl text-center font-bold text-gray-900 mb-16">Why people choose us?</h2>
                <div>
                    {quality.map((quality, index) => (
                        <div key={index} className="p-4 rounded-lg shadow-lg flex items-center mb-8">
                            <div className="mr-4 shadow-lg rounded-full">
                                <Image src={quality.icon} alt={quality.title} width={64} height={64} />
                            </div>
                            <div>
                                <h3 className="text-base text-gray-900 font-semibold">{quality.title}</h3>
                                <p className="text-gray-600">{quality.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Qualities;
