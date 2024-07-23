import Image from 'next/image';

const features = [
    {
        title: "Quality Food",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/icons/quality-food.png" 
    },
    {
        title: "Speed Delivery",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/icons/speed-delivery.png"
    },
    {
        title: "Affordable Pricing",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/icons/affordable-pricing.png" 
    },
    {
        title: "Quality Packaging",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        icon: "/icons/quality-packaging.png"
    }
];

const Features = () => {
    return (
        <div className="py-8 border-2 border-blue-500">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="mb-4">
                              <h2>icons ooo</h2>
                                {/* <Image src={feature.icon} alt={feature.title} width={64} height={64} /> */}
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
