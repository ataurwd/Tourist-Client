import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import useAllPayment from "../hooks/useAllPayment";
import { useLoaderData } from "react-router-dom";

// const stripePromiss = loadStripe(`${import.meta.VITE_PAYMENT}`)
const stripePromiss = loadStripe(
  "pk_test_51QgVp5RwZ10FIGO8sYxfqWwsf4CdbmxL4PcXPC8g5V7rzsyBHXSPXeqav1OeavcfpchBAM2FBnK20KruX3TjXxud00LQkCz8LL"
);

const StripePayment = () => {
  const data = useLoaderData();

  return (
    <div>
      <Elements stripe={stripePromiss}>
        <Payment />
      </Elements>
    </div>
  );
};

export default StripePayment;
