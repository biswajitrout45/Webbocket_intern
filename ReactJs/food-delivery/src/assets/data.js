const foodItems = [
    {
        "id": 1,
        "name": "Margherita Pizza",
        "category": "Pizza",
        "description": "Classic pizza topped with tomato sauce, mozzarella cheese and fresh basil.",
        "price": 299,
        "rating": 4.5,
        "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
        "isVeg": true
    },
    {
        "id": 2,
        "name": "Chicken Biryani",
        "category": "Biryani",
        "description": "Fragrant basmati rice cooked with tender chicken and aromatic spices.",
        "price": 249,
        "rating": 4.8,
        "image": "https://cdn.pixabay.com/photo/2023/06/27/15/16/rice-8092512_1280.jpg",
        "isVeg": false
    },
    {
        "id": 3,
        "name": "Veg Burger",
        "category": "Burger",
        "description": "Crispy vegetable patty served with lettuce, tomato and special sauce.",
        "price": 149,
        "rating": 4.2,
        "image": "https://cdn.pixabay.com/photo/2022/07/15/18/12/cheese-burger-7323672_1280.jpg",
        "isVeg": true
    },
    {
        "id": 4,
        "name": "Chicken Burger",
        "category": "Burger",
        "description": "Juicy chicken patty with lettuce, cheese, tomato and creamy sauce.",
        "price": 199,
        "rating": 4.6,
        "image": "https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419419_1280.jpg",
        "isVeg": false
    },
    {
        "id": 5,
        "name": "Masala Dosa",
        "category": "South Indian",
        "description": "Crispy dosa filled with spiced potato masala and served with chutney.",
        "price": 120,
        "rating": 4.7,
        "image": "https://cdn.pixabay.com/photo/2022/01/27/07/34/dosa-6971361_1280.jpg",
        "isVeg": true
    },
    {
        "id": 6,
        "name": "Paneer Butter Masala",
        "category": "Indian",
        "description": "Soft paneer cubes cooked in a rich buttery tomato gravy.",
        "price": 220,
        "rating": 4.6,
        "image": "https://cdn.pixabay.com/photo/2021/07/14/09/29/food-6465556_1280.jpg",
        "isVeg": true
    },
    {
        "id": 7,
        "name": "Butter Chicken",
        "category": "Indian",
        "description": "Tender chicken pieces cooked in a creamy tomato and butter gravy.",
        "price": 280,
        "rating": 4.8,
        "image": "https://cdn.pixabay.com/photo/2022/11/24/18/09/butter-chicken-7614835_1280.jpg",
        "isVeg": false
    },
    {
        "id": 8,
        "name": "Veg Fried Rice",
        "category": "Chinese",
        "description": "Fried rice tossed with fresh vegetables, soy sauce and aromatic spices.",
        "price": 160,
        "rating": 4.3,
        "image": "https://cdn.pixabay.com/photo/2015/10/01/14/26/fried-rice-967081_1280.jpg",
        "isVeg": true
    },
    {
        "id": 9,
        "name": "Chicken Fried Rice",
        "category": "Chinese",
        "description": "Flavorful fried rice with chicken, vegetables, egg and soy sauce.",
        "price": 190,
        "rating": 4.5,
        "image": "https://cdn.pixabay.com/photo/2021/12/29/23/59/pineapple-fried-rice-6902993_1280.jpg",
        "isVeg": false
    },
    {
        "id": 10,
        "name": "Hakka Noodles",
        "category": "Chinese",
        "description": "Stir-fried noodles tossed with vegetables and Chinese sauces.",
        "price": 170,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1552611052-33e04de081de",
        "isVeg": true
    },
    {
        "id": 11,
        "name": "Chicken Momos",
        "category": "Momos",
        "description": "Steamed dumplings filled with seasoned minced chicken and vegetables.",
        "price": 140,
        "rating": 4.7,
        "image": "https://cdn.pixabay.com/photo/2020/09/21/12/40/meal-5589923_1280.jpg",
        "isVeg": false
    },
    {
        "id": 12,
        "name": "Veg Momos",
        "category": "Momos",
        "description": "Steamed dumplings filled with finely chopped vegetables and spices.",
        "price": 120,
        "rating": 4.4,
        "image": "https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg",
        "isVeg": true
    },
    {
        "id": 13,
        "name": "French Fries",
        "category": "Snacks",
        "description": "Crispy golden potato fries lightly seasoned with salt.",
        "price": 99,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        "isVeg": true
    },
    {
        "id": 14,
        "name": "Chicken Wings",
        "category": "Snacks",
        "description": "Crispy chicken wings tossed in a spicy and tangy sauce.",
        "price": 220,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1527477396000-e27163b481c2",
        "isVeg": false
    },
    {
        "id": 15,
        "name": "Pav Bhaji",
        "category": "Indian",
        "description": "Spiced mashed vegetables served with butter-toasted pav bread.",
        "price": 130,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        "isVeg": true
    },
    {
        "id": 16,
        "name": "Chole Bhature",
        "category": "North Indian",
        "description": "Spicy chickpea curry served with fluffy deep-fried bhatura.",
        "price": 150,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
        "isVeg": true
    },
    {
        "id": 17,
        "name": "Chicken Tikka",
        "category": "Tandoori",
        "description": "Marinated chicken pieces grilled with aromatic Indian spices.",
        "price": 260,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
        "isVeg": false
    },
    {
        "id": 18,
        "name": "Tandoori Paneer",
        "category": "Tandoori",
        "description": "Grilled paneer cubes marinated in yogurt and Indian spices.",
        "price": 230,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
        "isVeg": true
    },
    {
        "id": 19,
        "name": "Pasta Alfredo",
        "category": "Pasta",
        "description": "Creamy pasta cooked with parmesan cheese and Italian herbs.",
        "price": 220,
        "rating": 4.4,
        "image": "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg",
        "isVeg": true
    },
    {
        "id": 20,
        "name": "Chicken Pasta",
        "category": "Pasta",
        "description": "Pasta tossed with grilled chicken, vegetables and creamy sauce.",
        "price": 250,
        "rating": 4.6,
        "image": "https://cdn.pixabay.com/photo/2022/06/02/18/22/ramen-7238665_1280.jpg",
        "isVeg": false
    },
    {
        "id": 21,
        "name": "Veg Sandwich",
        "category": "Sandwich",
        "description": "Fresh sandwich filled with vegetables, cheese and creamy dressing.",
        "price": 110,
        "rating": 4.2,
        "image": "https://cdn.pixabay.com/photo/2022/02/12/21/22/toast-7009956_1280.jpg",
        "isVeg": true
    },
    {
        "id": 22,
        "name": "Grilled Chicken Sandwich",
        "category": "Sandwich",
        "description": "Grilled chicken breast with lettuce, tomato and cheese.",
        "price": 180,
        "rating": 4.5,
        "image": "https://cdn.pixabay.com/photo/2023/04/02/21/38/sandwich-7895477_1280.jpg",
        "isVeg": false
    },
    {
        "id": 23,
        "name": "Chocolate Cake",
        "category": "Dessert",
        "description": "Rich and moist chocolate cake topped with chocolate frosting.",
        "price": 140,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        "isVeg": true
    },
    {
        "id": 24,
        "name": "Gulab Jamun",
        "category": "Dessert",
        "description": "Soft milk-solid dumplings soaked in warm sugar syrup.",
        "price": 90,
        "rating": 4.7,
        "image": "https://cdn.pixabay.com/photo/2026/02/21/04/21/kumarsu6745-attractive-10135864_1280.jpg",
        "isVeg": true
    },
    {
        "id": 25,
        "name": "Ice Cream Sundae",
        "category": "Dessert",
        "description": "Creamy vanilla ice cream topped with chocolate sauce and nuts.",
        "price": 130,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        "isVeg": true
    },
    {
        "id": 26,
        "name": "Mango Smoothie",
        "category": "Beverage",
        "description": "Refreshing smoothie made with ripe mangoes and chilled milk.",
        "price": 120,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1546173159-315724a31696",
        "isVeg": true
    },
    {
        "id": 27,
        "name": "Cold Coffee",
        "category": "Beverage",
        "description": "Chilled creamy coffee blended with milk and ice.",
        "price": 110,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
        "isVeg": true
    },
    {
        "id": 28,
        "name": "Fresh Lime Soda",
        "category": "Beverage",
        "description": "Refreshing lime drink made with fresh lemon juice and soda.",
        "price": 80,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
        "isVeg": true
    },
    {
        "id": 29,
        "name": "Fish Curry",
        "category": "Seafood",
        "description": "Fresh fish cooked in a flavorful Indian-style spicy curry.",
        "price": 280,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1534939561126-855b8675edd7",
        "isVeg": false
    },
    {
        "id": 30,
        "name": "Prawn Masala",
        "category": "Seafood",
        "description": "Juicy prawns cooked with onions, tomatoes and aromatic spices.",
        "price": 320,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47",
        "isVeg": false
    }
]


export default foodItems;