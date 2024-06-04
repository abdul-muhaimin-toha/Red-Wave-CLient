import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkoutForm.css";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import useAuth from "@/hooks/auth/useAuth";
import { toast } from "../ui/use-toast";

const CheckoutForm = ({ amount }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount: amount })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err.message));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        donor_name: user.displayName,
        donor_email: user.email,
        amount: amount,
        date: new Date(),
        transaction_id: paymentIntent.id,
      };

      axiosSecure
        .post("/funds", paymentInfo)
        .then((res) => {
          console.log(res.data);
          toast({
            title: "Congratulation",
            description: `Donation made successfully`,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Sorry!",
            description: `Something went wrong, try again`,
          });
        });
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay Now
        </Button>
      </form>
      {cardError && <p className="mt-2 text-sm text-red-600">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
