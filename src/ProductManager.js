import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const newproduct = {
        ...product,
        id: products.length + 1,
      };
      products.push(newproduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, newValue) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        Object.assign(products[productIndex], newValue);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return "Producto actualizado correctamente";
      } else {
        return "Producto no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return "Producto eliminado correctamente";
      } else {
        return "Producto no encontrado.";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((prod) => prod.id === id);
      if (!product) {
        return null;
      } else return product;
    } catch (err) {
      console.log(err);
    }
  }
}

/*
const manager = new ProductManager("./products.json");

const product1 = {
  title: "Producto 1",
  description: "Descripcion de producto 1",
  price: 20,
  thumbnail: "img1.jpg",
  code: "P1",
  stock: 8,
};

const product2 = {
  title: "Producto 2",
  description: "Descripcion de producto 2",
  price: 150,
  thumbnail: "img2.jpg",
  code: "P2",
  stock: 10,
};

const product3 = {
  title: "Producto 2",
  description: "Descripcion de producto 3",
  price: 75,
  thumbnail: "img3.jpg",
  code: "P3",
  stock: 15,
};

const actualizarProd = {
  title: "Producto 3",
};

const test = async () => {
  console.log(await manager.getProducts());
  await manager.addProduct(product1);
  await manager.addProduct(product2);
  await manager.addProduct(product3);
  console.log(await manager.getProducts());
  console.log(await manager.getProductById(1));
  console.log(await manager.deleteProduct(2));
  console.log(await manager.getProducts());
  console.log(await manager.updateProduct(3, actualizarProd));
  console.log(await manager.getProducts());
};
test();
*/
