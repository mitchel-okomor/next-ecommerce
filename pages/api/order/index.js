import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import { auth } from "../../../middleware/auth";
import Products from "../../../models/productModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { address, mobile, cart, total } = req.body;

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.inStock, item.sold);
    });

    const newOrder = new Orders({
      user: result.id,
      address,
      mobile,
      cart,
      total,
    });

    await newOrder.save();
    res.json({
      msg: "payment successful, we will cntact you to confirm order",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const sold = async (id, quantity, oldInstock, oldSold) => {
  await Products.findByIdAndUpdate(
    id,
    {
      inStock: oldInstock - quantity,
      sold: quantity + oldSold,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return;
      }
    }
  );
};
