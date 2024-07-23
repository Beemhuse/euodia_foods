import Button from "../reusables/buttons/Button";

const Hero = () => {
    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-100 to-white px-4 border border-red-400">
            <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-4">
                    Come For The <span className="bg-yellow-600 text-white px-5 py-1 rounded-full">Food</span>
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
                   <h1>foodimage</h1>
                    {/* <Image src={foodImage} alt="Food" className="rounded-lg" layout="fill" objectFit="cover" /> */}
                </div>
                <div className="absolute top-0 right-0 bg-white p-2 rounded shadow-md flex items-center">
                    <span className="material-icons text-red-500 mr-2">delivery_dining</span>
                    Delivery in 30 min
                </div>
                <div className="absolute bottom-0 right-0 bg-white p-2 rounded shadow-md flex items-center">
                    <h1>profilepic</h1>
                    {/* <Image src={profilePic} alt="Profile" className="rounded-full" width={32} height={32} /> */}
                    <div className="ml-2">
                        <p className="font-bold">Ali Jamal</p>
                        <p className="text-sm text-gray-500">4.5 <span className="text-yellow-500">&#9733;</span> 1k Likes</p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-white p-2 rounded shadow-md flex items-center">
                    <span className="material-icons text-orange-500 mr-2">location_on</span>
                    Location at destination
                </div>
            </div>
        </div>
    );
};

export default Hero;
