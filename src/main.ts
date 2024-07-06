import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";
import { UserController } from "./api/express/controllers/user.controller";

function main() {
    const api = ApiExpress.build();

    const productController = ProductController.build();
    const userController = UserController.build();

    api.addGetRoute("/products", productController.list);
    api.addPostRoute("/products/:id/buy", productController.buy);
    api.addPostRoute("/products/:id/sell", productController.sell);
    api.addPostRoute("/products/:userId/create", productController.create);

    api.addPostRoute("/user", userController.create);
    api.addGetRoute("/user", userController.list);
    api.addGetRoute("/userforproducts", userController.listUserForProduct);

    api.start(8000);
}

main();