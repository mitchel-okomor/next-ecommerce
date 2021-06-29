import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";

connectDB();

export default async (req, res) => {
  const getProducts = async (req, res) => {
    const { id } = req.query;
    try {
      const product = await Products.findById(id);
      if (!product)
        return res.status(400).json({ err: "Product does not exist" });

      res.json({
        product,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};
