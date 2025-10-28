// uploadData.js
import { db } from "./firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

const tiwarijiItems = [
  {
    name: "Steamed Momos",
    price: 40,
    image: "/images/steamed-momos.jpg",
    description: "Soft dumplings filled with flavorful veggie stuffing, steamed to perfection.",
    category: "Momos",
    quantity: 5
  },
  {
    name: "Fried Momos",
    price: 50,
    image: "/images/fried-momos.jpg",
    description: "Crispy fried momos served with spicy dip.",
    category: "Momos",
    quantity: 5
  },
  {
    name: "Kurkure Momos",
    price: 60,
    image: "/images/kurkure-momos.jpg",
    description: "Momos coated with crispy kurkure and deep fried for extra crunch.",
    category: "Momos",
    quantity: 5
  },
  {
    name: "Cheesy Maggi",
    price: 45,
    image: "/images/cheesy-maggi.jpg",
    description: "Classic Maggi loaded with melted cheese and spices.",
    category: "Maggi",
    quantity: 5
  },
  {
    name: "Plain Maggi",
    price: 30,
    image: "/images/plain-maggi.jpg",
    description: "Simple and classic Maggi with minimal spices.",
    category: "Maggi",
    quantity: 5
  },
  {
    name: "Masala Maggi",
    price: 35,
    image: "/images/masala-maggi.jpg",
    description: "Spicy and flavorful Maggi made with Indian masalas.",
    category: "Maggi",
    quantity: 5
  },
  {
    name: "White Sauce Pasta",
    price: 60,
    image: "/images/white-pasta.jpg",
    description: "Creamy white sauce pasta with veggies and herbs.",
    category: "Pasta",
    quantity: 5
  },
  {
    name: "Red Sauce Pasta",
    price: 60,
    image: "/images/red-pasta.jpg",
    description: "Tangy tomato-based pasta garnished with herbs and cheese.",
    category: "Pasta",
    quantity: 5
  },
  {
    name: "Spring Rolls",
    price: 40,
    image: "/images/spring-rolls.jpg",
    description: "Crispy rolls filled with vegetables and served hot.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Paneer Kulcha",
    price: 50,
    image: "/images/paneer-kulcha.jpg",
    description: "Stuffed kulcha bread filled with spicy paneer mix.",
    category: "Indian Breads",
    quantity: 5
  },
  {
    name: "Burger",
    price: 50,
    image: "/images/burger.jpg",
    description: "Classic burger with patty, lettuce, and sauces in a bun.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Grilled Sandwich",
    price: 45,
    image: "/images/grilled-sandwich.jpg",
    description: "Crispy grilled sandwich loaded with veggies and cheese.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Non-Grilled Sandwich",
    price: 40,
    image: "/images/nongrilled-sandwich.jpg",
    description: "Soft sandwich filled with fresh veggies and sauces.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Patties",
    price: 20,
    image: "/images/patties.jpg",
    description: "Baked puff filled with spiced potato filling.",
    category: "Bakery",
    quantity: 5
  },
  {
    name: "Tea",
    price: 15,
    image: "/images/tea.jpg",
    description: "Hot and aromatic Indian chai, perfect for a quick refresh.",
    category: "Beverages",
    quantity: 5
  }
];

const nescafeItems = [
  {
    name: "Cold Coffee",
    price: 40,
    image: "/images/cold-coffee.jpg",
    description: "Chilled and refreshing coffee blended with milk and sugar.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Hot Coffee",
    price: 30,
    image: "/images/hot-coffee.jpg",
    description: "Classic brewed coffee served hot with a rich aroma.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Cup Noodles",
    price: 80,
    image: "/images/noodles.jpeg",
    description: "Instant cup noodles served hot and spicy.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Cappuccino",
    price: 55,
    image: "/images/cappuccino.jpg",
    description: "Espresso-based drink topped with frothy milk foam.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Hot Chocolate",
    price: 45,
    image: "/images/hot-chocolate.jpg",
    description: "Warm and creamy chocolate drink for cozy moments.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Latte",
    price: 50,
    image: "/images/latte.jpg",
    description: "Smooth espresso mixed with steamed milk for a creamy texture.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Mocha",
    price: 55,
    image: "/images/mocha.jpg",
    description: "Perfect blend of coffee and chocolate, topped with cream.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Choco Frappe",
    price: 60,
    image: "/images/choco-frappe.jpg",
    description: "Icy chocolate-coffee blend topped with whipped cream.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Espresso",
    price: 50,
    image: "/images/espresso.jpg",
    description: "Strong, bold coffee shot with intense flavor.",
    category: "Beverages",
    quantity: 5
  },
  {
    name: "Veg Sandwich",
    price: 50,
    image: "/images/veg-sandwich.jpg",
    description: "Fresh veggies and sauces between soft sandwich bread.",
    category: "Snacks",
    quantity: 5
  },
  {
    name: "Brownie",
    price: 40,
    image: "/images/brownie.jpg",
    description: "Rich and fudgy chocolate brownie baked to perfection.",
    category: "Desserts",
    quantity: 5
  },
  {
    name: "Chocolate Donut",
    price: 45,
    image: "/images/choco-donut.jpg",
    description: "Soft donut glazed with delicious chocolate coating.",
    category: "Desserts",
    quantity: 5
  }
];

export default nescafeItems;
;

const uploadShopData = async () => {
  const shops = [
    { name: "tiwariji", items: tiwarijiItems },
    { name: "nescafe", items: nescafeItems },
  ];

  for (const shop of shops) {
    for (const item of shop.items) {
      const docRef = doc(collection(db, "shops", shop.name, "items"));
      await setDoc(docRef, item);
    }
  }

  console.log("✅ Data uploaded successfully!");
};

uploadShopData();
