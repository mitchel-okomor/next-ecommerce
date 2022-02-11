import Link from 'next/link';
import Pay from './Pay';
import { patchData } from '../utils/fetchData';
import { updateItem } from '../store/Actions';
import Image from 'next/image';

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;
  const handleDelivered = (order) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
      const { method, paid, delivered, deliveryDate } = res.result;
      dispatch(
        updateItem(
          orders,
          order._id,
          { ...order, method, paid, delivered, deliveryDate },
          'ADD_ORDERS'
        )
      );
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    });
  };
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          style={{ margin: '20px auto' }}
          className='row justify-content-around'
        >
          <div
            key={order._id}
            className='text-uppercase my-3'
            style={{ maxWidth: '600px' }}
          >
            <h2 className='text-break'>Order {order._id}</h2>
            <div className='mt-4 text-secondary'>
              <h3 className='my-3'>Delivery</h3>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>

              <div
                className={`alert ${
                  order.delivered ? 'alert-success' : 'alert-danger'
                } d-flex justify-content-between align-item-center`}
                role='alert'
              >
                {order.delivered
                  ? `Delievered on ${new Date(
                      order.deliveryDate
                    ).toLocaleDateString()}`
                  : 'Not Delivered'}
                {auth.user.role === 'admin' && !order.delivered && (
                  <button
                    className='btn btn-dark text-uppercase'
                    onClick={() => handleDelivered(order)}
                  >
                    mark as deliverd
                  </button>
                )}
              </div>
              <h3>Payment</h3>
              {order.method && (
                <h6>
                  Method: <em>{order.method}</em>
                </h6>
              )}
              {order.paymentId && (
                <p>
                  PaymentId: <em>{order.paymentId}</em>
                </p>
              )}

              <div
                className={`alert ${
                  order.paid ? 'alert-success' : 'alert-danger'
                } d-flex justify-content-between align-item-center`}
                role='alert'
              >
                {order.paid
                  ? `Paid on ${
                      new Date(order.dateOfPayment).toDateString() +
                      '  ' +
                      new Date(order.dateOfPayment).toLocaleTimeString()
                    }`
                  : 'Not Paid'}
              </div>
            </div>
            <div>
              <h3>Order items</h3>
              {order.cart.map((item) => (
                <div
                  className='row border-bottom mx-0 p-2 justify-content-between align-middle '
                  key={item._id}
                  style={{ maxWidth: '550px' }}
                >
                  <Image
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    style={{ width: '50px', height: '45', objectFit: 'cover' }}
                    layout='fill'
                    width={500}
                    height={500}
                  />

                  <h5 className='flex-fill text-secondary px-3 m-0'>
                    <Link href={`/product/${item._id}`}>
                      <a className='text-primary'>{item.title}</a>
                    </Link>
                  </h5>
                  <span className='text-info m-0'>
                    {item.quantity} X ${item.price} = $
                    {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {!order.paid && auth.user.role !== 'admin' && (
            <div className='p-4'>
              <h2 className='mb-4 textuppercase'>Total: ${order.total}</h2>
              <Pay order={order} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
