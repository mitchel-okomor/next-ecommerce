import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import { useRouter } from "next/router";
import OrderDetail from "../../components/OrderDetail";

function DetailOrder() {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;
  const [orderDetail, setOrderDetail] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  if (!auth.user) return null;
  return (
    <div className="my-3">
      <Head>
        <title>Detail Orders</title>
      </Head>
      <div>
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-long-arrow-alt-left" aria-hidden></i> Go back
        </button>
      </div>
      <OrderDetail
        orderDetail={orderDetail}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
}

export default DetailOrder;
