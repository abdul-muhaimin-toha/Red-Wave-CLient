import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Stripe Import
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "@/hooks/auth/useAuth";
import { useState } from "react";

// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundingModal = ({ refetch }) => {
  const [amount, setAmount] = useState(5);
  const { user } = useAuth();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Give Fund</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donate Now</DialogTitle>
          <DialogDescription>
            Securely donate online with your preferred payment method.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={user.displayName}
              disabled
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" disabled defaultValue={user.email} type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount in USD</Label>
            <Input
              id="amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              defaultValue={amount}
            />
          </div>
          {/* Stripe Payment Elements */}
          <div className="mt-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={amount} refetch={refetch} />
            </Elements>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundingModal;
