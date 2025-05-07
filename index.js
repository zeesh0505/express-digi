import 'dotenv/config';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json())

const products = [];
let nextId = 1;

//Add a product
app.post('/product', (req,res) => {
    const {name, price} = req.body;
    const newProduct = {id: nextId++, name, price }
    products.push(newProduct)
    if(newProduct) {
        res.status(201).send(newProduct) 
    } else {
        res.status(404).send("404 No product present to be to added")
    }
})

//Get the list of products
app.get('/product', (req,res) => {
    res.status(200).send(products) 
})

//Get the list of products based on id
app.get('/product/:id', (req,res) => {
    const productId = parseInt(req.params.id);
    const searchedProduct = products?.find((p, index) => p.id === productId);
    if(!searchedProduct) {
        res.status(404).send("Product not found bro !!")
    } else {
        res.status(200).send(searchedProduct)
    }
})

//update a particular product
app.put("/product/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const searchedProduct = products?.find((p, index) => p.id === productId);
    if(!searchedProduct) {
        res.status(404).send("Product not found bro !!")
    } else {
        if(req.body.name) searchedProduct.name = req.body.name;
        console.log(searchedProduct);

        if(req.body.price) searchedProduct.price = req.body.price;
        console.log(searchedProduct);
        res.status(200).send(searchedProduct)
    }
})

//Delete a particular product
app.delete("/product/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const searchedProductIndex = products?.findIndex((p, index) => p.id === productId);
    products.splice(searchedProductIndex,1)
    if(searchedProductIndex === -1) {
        res.status(404).send("Product not found bro !!")
    } else {
        res.status(200).send("Deleted !!")
    }
})

app.listen(port, () => {
    console.log("server is running ar port:", port);
})