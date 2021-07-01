import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import { auth } from "../../../middleware/auth";
import Products from "../../../models/productModel";

connectDB();

//routes
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await paymentOrder(req, res);
      break;
  }
};

const paymentOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { id } = result;
    await Orders.findOneAndUpdate(
      { _id: id },
      { paid: true, dateOfPayment: new Date().toISOString() },
      (err, doc, data) => {
        res.json({ msg: " Payment successful" });
      }
    );
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
