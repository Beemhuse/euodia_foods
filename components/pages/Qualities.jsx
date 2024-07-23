import Image from 'next/image';

const quality = [
    {
        title: "Convinent and Reliable",
        description: "Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.",
        icon: "/icons/quality-food.png"
    },
    {
        title: "Variety of Options",
        description: "From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.",
        icon: "/icons/speed-delivery.png"
    },
    {
        title: "Fresh Ingredients",
        description: "We us only the Freshest Ingredients, sourced locally whenever possible",
        icon: "/icons/affordable-pricing.png"
    }
];

const Qualities = () => {
    return (
        <div className="py-8 border-2 border-blue-500 flex justify-around">
            <div className="col-6 border-2 border-yellow-600">
                {/* <Image src={}> </Image> */}
                <h4>food images</h4>
            </div>
            <div className="col-6 border-2 border-pink-600 ">
                <h2 className='text-4xl text-center font-bold mb-8'>Why people choose us?</h2>
                <div className=" ">
                    {quality.map((quality, index) => (
                        <div key={index} className="p-4 rounded-lg shadow-lg border-2 border-green-500 flex items-center">
                            <div className="">
                                <h2 className='border rounded-full p-5 shadow-lg border-violet-500'>icons</h2>
                                {/* <Image src={feature.icon} alt={feature.title} width={64} height={64} /> */}
                            </div>
                            <div>
                                <h3 className="text-base font-semibold">{quality.title}</h3>
                                <p className="text-gray-600 text-wrap">{quality.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Qualities;
