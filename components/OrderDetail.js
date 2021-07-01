import Link from "next/link";
import Pay from "./Pay";

const OrderDetail = ({ orderDetail }) => {
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          style={{ margin: "20px auto" }}
          className="row justify-content-around"
        >
          <div
            key={order._id}
            className="text-uppercase my-3"
            style={{ maxWidth: "600px" }}
          >
            <h2 className="text-break">Order {order._id}</h2>
            <div className="mt-4 text-secondary">
              <h3 className="my-3">Delivery</h3>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>

              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-item-center`}
                role="alert"
              >
                {order.delivered
                  ? `Delivered on ${order.updatedAt}`
                  : "Not Delivered"}
              </div>
              <h3>Payment</h3>
              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-item-center`}
                role="alert"
              >
                {order.paid
                  ? `Delivered on ${order.dateOfPayment}`
                  : "Not Paid"}
              </div>
            </div>
            <div>
              <h3>Order items</h3>
              {order.cart.map((item) => (
                <div
                  className="row border-bottom mx-0 p-2 justify-content-between align-middle "
                  key={item._id}
                  style={{ maxWidth: "550px" }}
                >
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    style={{ width: "50px", height: "45", objectFit: "cover" }}
                  />

                  <h5 className="flex-fill text-secondary px-3 m-0">
                    <Link href={`/product/${item._id}`}>
                      <a className="text-primary">{item.title}</a>
                    </Link>
                  </h5>
                  <span className="text-info m-0">
                    {item.quantity} X ${item.price} = $
                    {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="mb-4 textuppercase">Total: ${order.total}</h2>
            <Pay total={order} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
