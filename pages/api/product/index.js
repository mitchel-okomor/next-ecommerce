import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import { auth } from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  const getProducts = async (req, res) => {
    try {
      const products = await Products.find();
      console.log("products: ", products);
      res.json({
        status: "success",
        result: products.length,
        products,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  const createProduct = async (req, res) => {
    try {
      const result = await auth(req, res);
      if (result.role !== "admin")
        return res.status(500).json({ err: "Unauthorized" });
      const { title, price, description, content, category, inStock, images } =
        req.body;

      if (
        !title ||
        !price ||
        !description ||
        !content ||
        category === "all" ||
        !inStock ||
        images.length === 0
      )
        return res.status(400).json({ err: "Please add all fields" });

      const newProduct = new Products({
        title: title.toLowerCase(),
        price,
        description,
        content,
        category,
        inStock,
        images,
      });

      await newProduct.save();
      res.json({
        msg: "Created successfully",
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};
