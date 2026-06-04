import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Payment from "./Payment";
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";

const StripePayment = () => {
  const cardData = useLoaderData();
  const [clientSecret, setClientSecret] = useState("");
  const [initError, setInitError] = useState("");

  const stripePromise = useMemo(
    () => loadStripe(import.meta.env.VITE_STRITEKEY),
    []
  );

  useEffect(() => {
    if (!import.meta.env.VITE_STRITEKEY) {
      setInitError("Stripe publishable key is missing. Check VITE_STRITEKEY in .env");
      return;
    }

    if (!cardData?._id || cardData?.price == null) {
      setInitError("Booking details are missing. Go back and try again.");
      return;
    }

    const controller = new AbortController();
    setClientSecret("");
    setInitError("");

    axios
      .post(
        `${import.meta.env.VITE_URL}/stripe-payment`,
        {
          price: cardData.price,
          bookingId: cardData._id,
        },
        { signal: controller.signal }
      )
      .then((res) => {
        if (res.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          setInitError("Could not start payment. Please refresh and try again.");
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        const message =
          err.response?.data?.message ||
          err.message ||
          "Failed to initialize payment";
        setInitError(message);
        toast.error(message);
      });

    return () => controller.abort();
  }, [cardData?._id, cardData?.price]);

  if (initError) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center text-slate-600 dark:text-slate-300">
        <p className="font-semibold">{initError}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center text-slate-500">
        <span className="loading loading-spinner loading-md text-primary" />
        <p className="mt-4 text-sm font-medium">Preparing secure checkout...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Payment clientSecret={clientSecret} />
    </Elements>
  );
};

export default StripePayment;
