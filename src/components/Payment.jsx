import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../context/FormData";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useBooking from "../hooks/useBooking";
import useUser from "../hooks/useUser";
import Button from "./shared/Button";
import { FiCreditCard, FiUser, FiCalendar, FiMapPin, FiInfo } from "react-icons/fi";

const Payment = () => {
  const [clientSecrate, setClientSecrate] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(FormContext);
  const [guideBooking, refetch] = useBooking();
  const stripe = useStripe();
  const elements = useElements();
  const cardData = useLoaderData();
  const navigate = useNavigate();
  const [loginUser] = useUser();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_URL}/stripe-payment`, {
        price: cardData.price,
      })
      .then((res) => {
        setClientSecrate(res.data.clientSecret);
      });
  }, [cardData.price]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        toast.error(error.message || "Failed to parse credit card details.");
        setLoading(false);
        return;
      }

      const { paymentIntent, error: cardErrr } =
        await stripe.confirmCardPayment(clientSecrate, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "default@example.com",
              name: user?.displayName || "Anonymous",
            },
          },
        });

      if (cardErrr) {
        toast.error(cardErrr.message || "Payment transaction declined.");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success(`Payment Successful! Charged $${cardData.price}.`);
        refetch();
        navigate(
          `${
            loginUser?.role === "admin"
              ? "/dashboard/admin-assigned"
              : "/dashboard/tourist-bookings"
          }`
        );

        axios
          .post(`${import.meta.env.VITE_URL}/payment`, {
            itemId: cardData._id,
            payment: paymentIntent,
          })
          .then(async (res) => {
            if (res.data.insertedId) {
              const response = await axios.patch(
                `${import.meta.env.VITE_URL}/update-guide-status/${
                  cardData._id
                }`
              );
              if (response.status === 200) {
                refetch();
              }
            }
          });
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      toast.error("Something went wrong while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Order Summary Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-premium relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                Order Summary
              </span>
              <h3 className="text-xl font-bold font-display mt-4 leading-tight">
                {cardData?.packageName || "Tour Package"}
              </h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiUser className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Guide Assigned</span>
                  <span className="font-semibold">{cardData?.tourGuide || "Pending"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiCalendar className="h-4 w-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Scheduled Date</span>
                  <span className="font-semibold">{cardData?.date || "Not set"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiMapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Booking Reference</span>
                  <span className="font-mono text-xs">{cardData?._id?.substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-8 md:mt-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Amount Due</span>
            <div className="text-3xl font-extrabold font-display text-white mt-1">
              ${cardData?.price}
            </div>
          </div>
        </div>

        {/* Payment Details Card */}
        <div className="md:col-span-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl p-8 shadow-premium">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
              Payment Details
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Payments are secured and processed using Stripe encryption.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Cardholder Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Card Information */}
            <div>
              <label htmlFor="card-details" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Card Information
              </label>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <CardElement
                  id="card-details"
                  options={{
                    style: {
                      base: {
                        color: "#0f172a",
                        fontSize: "14px",
                        fontFamily: "Outfit, Inter, sans-serif",
                        "::placeholder": {
                          color: "#94a3b8",
                        },
                      },
                      invalid: {
                        color: "#ef4444",
                        iconColor: "#ef4444",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <FiInfo className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span>By clicking Pay Now, you authorize the charge of the amount shown in order summary to your card.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-750">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!stripe || !clientSecrate || loading}
                loading={loading}
                className="w-full font-bold text-base gap-2"
              >
                <FiCreditCard className="h-5 w-5" /> Pay ${cardData?.price} Now
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;
