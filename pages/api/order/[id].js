import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import { auth } from "../../../middleware/auth";
import Payments from "../../../models/payment";

connectDB();

//routes
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await orderPayment(req, res);
      break;
  }
};

// const paymentOrder = async (req, res) => {
//   const { id } = req.query;
//   try {
//     await Orders.findByIdAndUpdate(
//       id,
//       { paid: true, dateOfPayment: new Date().toISOString() },
//       function (err, docs) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.json({ msg: " Payment successful" });
//         }
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ err: err.message });
//   }
// };

const orderPayment = async (req, res) => {
  const { id } = req.query;
  try {
    const { message, reference, status, trans, transaction, trxref } = req.body;

    const newPayment = new Payments({
      order: id,
      message,
      reference,
      status,
      trans,
      transaction,
      trxref,
    });

    await newPayment.save();
    await updateOrder(id, trxref);
    res.json({
      msg: " Payment successful",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateOrder = async (id, trxref) => {
  await Orders.findByIdAndUpdate(
    id,
    {
      paid: true,
      dateOfPayment: new Date().toISOString(),
      paymentId: trxref,
      method: "Card",
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  );
};
