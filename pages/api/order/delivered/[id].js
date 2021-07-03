import connectDB from "../../../../utils/connectDB";
import Orders from "../../../../models/orderModel";
import { auth } from "../../../../middleware/auth";
import Payments from "../../../../models/payment";

connectDB();

//routes
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Unauthorized" });

    const order = Orders.findOne({ _id: id });

    if (order.paid) {
      await Orders.findByIdAndUpdate(
        id,
        {
          delivered: true,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              msg: " Update successful",
              method: "Card",
              result: {
                method: order.method,
                delivered: true,
                deliveryDate: new Date().toISOString(),
              },
            });
          }
        }
      );
    } else {
      await Orders.findByIdAndUpdate(
        id,
        {
          delivered: true,
          method: "Received Cash",
          paid: true,
          deliveryDate: new Date().toISOString(),
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              msg: " Update successful",
              result: {
                delivered: true,
                paid: true,
                method: "Received Cash",
                deliveryDate: new Date().toISOString(),
              },
            });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
