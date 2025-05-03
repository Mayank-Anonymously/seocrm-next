import { DETAILS_OF_GATEWAY, baseURL } from "Components/helpers/url_helper";
import { GettAllContent } from "Components/slices/content/thunk";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = ({ orderId }: any) => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<any>([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `${baseURL}${DETAILS_OF_GATEWAY}/${orderId}`
      );
      const order: any = await response;
      setPaymentDetails(order.orderDetails.items);
    };
    fetchDetails();
  }, []);

  const successhandle = () => {
    router.push("/razor/success");
  };

  const failurewhandle = () => {
    router.push("/razor/failure");
  };

  const isAnyCaptured = paymentDetails.some(
    (payment: any) => payment.captured === true
  );
  return (
    <div>
      <div className="text-center mx-5 my-5">
        {paymentDetails.length > 0 && (
          <>{isAnyCaptured === true ? successhandle() : failurewhandle()}</>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const { orderId } = context.query;
    // const fetchApi = await axios.get(`${job_api_host}/allvms/getAllFeeds`);
    // const responseData: any = await fetchApi; // Assuming responseData is an array of incremental data

    // const data = responseData.map((ite: any) =>
    //   Object.keys(ite).map((item, index) => ite[item])
    // );

    return { props: { orderId: orderId } };
  } catch (error) {
    console.error("Error fetching incremental data:", error);
    return { props: { data: [] } }; // Return empty array or handle error accordingly
  }
};

export default Order;
