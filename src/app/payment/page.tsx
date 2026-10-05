import Link from "next/link";
import {
  ArrowLeft,
  Box,
  Home,
  Info,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import PaymentForm from "@/components/paymentForm/PaymentForm";
import { PaymentMethodProvider } from "@/Context/PaymentMethodProvider";
import PaymentMethodCards from "@/components/paymentmethod/PaymentMethodCards";
import PlaceOrderButton from "@/components/placeorderbtn/PlaceOrderButton";
import { getUserCart } from "@/components/addtocart/productAction";
import PaymentRow from "@/components/paymentrow/PaymentRow";

export default async function page() {
const data = await getUserCart()
const { products, totalCartPrice ,_id } = data.data;

const FREE_SHIPPING_FROM = 500;
const SHIPPING_COST = 50;

const isFreeShipping = totalCartPrice >= FREE_SHIPPING_FROM;
const shipping = isFreeShipping ? 0 : SHIPPING_COST;
const finalTotal = totalCartPrice + shipping;
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-main-color transition" href="/">Home</Link>
            <span className="text-gray-300">/</span>
            <Link className="hover:text-main-color transition" href="/cart">Cart</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-main-color to-[#15813E] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Receipt className="size-6" />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-main-color hover:text-[#15813E] font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              href="/cart"
            >
              <ArrowLeft className="size-4" />
              Back to Cart
            </Link>
          </div>
        </div>

        <PaymentMethodProvider>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping address */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-main-color to-[#15813E] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Home className="size-4" />
                    Shipping Address
                  </h2>
                  <p className="text-white text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Info className="size-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Please ensure your address is accurate for smooth delivery
                      </p>
                    </div>
                  </div>
                  <PaymentForm  cartId={_id} />
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-main-color to-[#15813E] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wallet className="size-5" />
                    Payment Method
                  </h2>
                  <p className="text-white text-sm mt-1">
                    Choose how you'd like to pay
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <PaymentMethodCards />

                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-100 mt-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="size-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure & Encrypted
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Your payment info is protected with 256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">
                <div className="bg-linear-to-r from-main-color to-[#15813E] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="size-4" />
                    Order Summary
                  </h2>
                  <p className="text-white text-sm mt-1">3 items</p>
                </div>

                <div className="p-5">
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
{products.map((e)=>(<PaymentRow key={e._id} prod={e}/>))}


                
                  </div>

                  <hr className="border-gray-100 my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{data.data.totalCartPrice} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <Truck className="size-4 text-gray-400" />
                        Shipping
                      </span>
                      <span className="text-green-600 font-semibold">
<span className={isFreeShipping ? "text-green-600 font-semibold" : "font-medium text-gray-900"}>
  {isFreeShipping ? "FREE" : `${SHIPPING_COST} EGP`}
</span>                      </span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <div className="text-right">
<span className="text-2xl font-bold text-main-color">{finalTotal}</span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  <PlaceOrderButton />

                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ShieldCheck className="size-3 text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Truck className="size-3 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Box className="size-3 text-orange-500" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PaymentMethodProvider>
      </div>
    </div>
  );
}