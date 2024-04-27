import express from "express";
import ProductManager from "./ProductManager.js";

//Instanciar clase
const productManager = new ProductManager("./products.json");
//levantar servidor
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else {
      const productsList = products.slice(0, limit);
      res.status(200).json(productsList);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" });
    } else res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.listen(port, () => console.log("Listening on port " + port));
