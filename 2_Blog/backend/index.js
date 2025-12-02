const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.static('dist'));
const PORT = process.env.PORT || 3000;

const products = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and display",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjOadlL._AC_UY879_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        }
    }
];

app.get('/api/', (req, res) => {
    res.send('Hello World!');
});

app.get("/api/product", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
