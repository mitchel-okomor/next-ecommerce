import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/categoriesModel";
import { auth } from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  const updateCategory = async (req, res) => {
    const { id } = req.query;
    try {
      const result = await auth(req, res);
      if (result.role !== "admin")
        return res.status(401).json({ err: "Unauthorized" });
      const { name } = req.body;
      const newCategory = await Categories.findOneAndUpdate(
        { _id: id },
        { name }
      );

      res.json({
        msg: "Category updated successfully!",
        category: { ...newCategory._doc, name },
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  const deleteCategory = async (req, res) => {
    const { id } = req.query;
    try {
      const result = await auth(req, res);
      if (result.role !== "admin")
        return res.status(401).json({ err: "Unauthorized" });
      await Categories.findByIdAndDelete(id);

      res.json({
        msg: "Category deleted successfully!",
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};
