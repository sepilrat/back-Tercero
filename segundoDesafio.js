

//Estoy con mucho trabajo porque nos hackearon la infra de servicios y soy el responsable, esta semana no
//pude ocuparme, voy a ir actualizando a medida que pueda. gracias por entender.




const fs = require("fs");
const { json } = require("stream/consumers");

class productManager {
  constructor() {
    this.path = "products.json";
    const productsString = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(productsString);
  }

  getProductById = (id) => {
    let pro = this.products.find((p) => p.id === id);
    if (pro) {
      return pro;
    } else {
      console.log("Error: Not Found");
    }
  };

  generarID = () => {
    let maxId = 0;

    // Recorrer el array this.products
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];

      // Comprobar si el id actual es mayor que el máximo id encontrado hasta ahora
      if (product.id > maxId) {
        maxId = product.id + 1;
      }
    }
    console.log("Max " + maxId + 1);
    return maxId +1;
    
  };

  getProducts = () => {
    return this.products;
  };

  deleteProduct(id) {
    const index = this.products.findIndex((productID) => productID.id == id);
    if (index === -1 || isNaN(id)) {
      console.log("Producto no encontrado");
      return;
    } else {
      this.products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("Producto Eliminado");
    }
  }
  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const index = this.products.findIndex((productID) => productID.id == id);
    if (index === -1 || isNaN(id)) {
      console.log("Producto no encontrado");
      return;
    } else {
      this.products[index].id = id;
      this.products[index].title = title;
      this.products[index].description = description;
      this.products[index].price = price;
      this.products[index].thumbnail = thumbnail;
      this.products[index].code = code;
      this.products[index].stock = stock;
      console.log(this.products);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("Producto " + id + " Actualizado");
    }
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (typeof title !== "string" || title === "") {
      console.log("El titulo debe ser string no vacío");
      return;
    }
    if (typeof description !== "string" || description === "") {
      console.log("La descripción debe ser string no nulo");
      return;
    }
    if (typeof price !== "number" || price < 0) {
      console.log("El precio debe ser un número mayor o igual a cero");
      return;
    }
    if (typeof code !== "number" || code < 0) {
      console.log("El código debe ser un número mayor o igual a cero");
      return;
    }
    if (typeof stock !== "number" || stock < 0) {
      console.log("El stock debe ser un número mayor o igual a cero");
      return;
    }

    if (!this.products.find((p) => p.code === code)) {
      const product = {
        id: this.generarID(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      this.products.push(product);
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync("products.json", productsString);
    } else {
      console.log("El producto con code = " + code + " ya existe");
    }

    return;
  };
}

let pm = new productManager();
pm.addProduct("titulo", "desc", 2, "", 87, 5);
//pm.updateProduct(1, "saraza", "desc", 100, "hghgh", 99, 13);
// pm.addProduct("c", "f", 34, "tum", 2, 2); // no lo carga por duplicado y e informa de que ya existe
// pm.addProduct("d", "h", 34, "tum", 5, 3);
// console.log("producto 2 " + pm.getProductById(2)); //devuelve el objeto
// pm.getProductById(5); // devuelve error
//pm.deleteProduct(2);
console.log(pm.getProducts()); //devuelve el array de productos
