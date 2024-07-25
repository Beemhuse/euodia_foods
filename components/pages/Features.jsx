import Image from 'next/image';

const features = [
    {
        title: "Quality Food",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/01.png" 
    },
    {
        title: "Speed Delivery",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/02.png"
    },
    {
        title: "Affordable Pricing",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/image 25.png" 
    },
    {
        title: "Quality Packaging",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/5.png"
    }
];

const Features = () => {
    return (
        <div className="py-8 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="mb-6 flex items-center justify-center h-16 w-16 mx-auto">
                                <Image src={feature.icon} alt={feature.title} width={64} height={64} />
                            </div>
                            <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
