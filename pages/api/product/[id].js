import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';
import { auth } from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  const getProduct = async (req, res) => {
    const { id } = req.query;
    try {
      const product = await Products.findById(id);
      if (!product)
        return res.status(400).json({ err: 'Product does not exist' });

      res.json({
        product
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const result = await auth(req, res);
      if (result.role !== 'admin')
        return res.status(500).json({ err: 'Unauthorized' });
      const { id } = req.query;
      const { title, price, description, content, category, inStock, images } =
        req.body;

      if (
        !title ||
        !price ||
        !description ||
        !content ||
        category === 'all' ||
        !inStock ||
        images.length === 0
      )
        return res.status(400).json({ err: 'Please add all fields' });

      await Products.findOneAndUpdate(
        { _id: id },
        {
          title,
          price,
          description,
          content,
          category,
          inStock,
          images
        }
      );
      res.json({
        msg: 'Updated successfully'
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const result = await auth(req, res);
      if (result.role !== 'admin')
        return res.status(500).json({ err: 'Unauthorized' });
      const { id } = req.query;

      await Products.findByIdAndDelete(id);
      res.json({
        msg: 'deleted successfully'
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
    case 'PUT':
      await updateProduct(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
  }
};
