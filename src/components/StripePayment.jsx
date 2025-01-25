import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import useAllPayment from "../hooks/useAllPayment";
import { useLoaderData } from "react-router-dom";

// const stripePromiss = loadStripe(`${import.meta.VITE_PAYMENT}`)
const stripePromiss = loadStripe(import.meta.env.VITE_STRITEKEY);

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
