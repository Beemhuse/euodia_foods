import Image from 'next/image';
import Button from '../reusables/buttons/Button';

const bestSellerDishes = [
  {
    title: "Spaghetti Carbonara",
    price: "$12.99",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "/images/spaghetti-carbonara.jpg" // Replace with the actual path to the dish image
  },
  {
    title: "Margherita Pizza",
    price: "$10.99",
    description: "A simple yet delicious pizza topped with tomatoes, mozzarella, and fresh basil.",
    image: "/images/margherita-pizza.jpg" // Replace with the actual path to the dish image
  },
  {
    title: "Caesar Salad",
    price: "$8.99",
    description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
    image: "/images/caesar-salad.jpg" // Replace with the actual path to the dish image
  },
  {
    title: "Grilled Salmon",
    price: "$15.99",
    description: "Perfectly grilled salmon served with a side of vegetables.",
    image: "/images/grilled-salmon.jpg" // Replace with the actual path to the dish image
  },
  {
    title: "Beef Tacos",
    price: "$9.99",
    description: "Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.",
    image: "/images/beef-tacos.jpg" // Replace with the actual path to the dish image
  },
  {
    title: "Chocolate Cake",
    price: "$6.99",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    image: "/images/chocolate-cake.jpg" // Replace with the actual path to the dish image
  }
];

const BestSellerDishes = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Best Seller Dishes</h2>
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {bestSellerDishes.map((dish, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <Image src={dish.image} alt={dish.title} width={320} height={240} className="rounded-lg" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{dish.title}</h3>
                <p className="text-green-500 text-lg font-bold">{dish.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 me-8">{dish.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4">Buy Now</button>
                {/* <Button size='small' title='Buy Now' color='accent'/> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellerDishes;
