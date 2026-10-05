"use client";

import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Building2, MapPin, Phone } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PayOrder } from "@/app/payment/payorder.action";
import { usePaymentMethod } from "@/Context/PaymentMethodProvider";
import { CartCounterProvider } from "@/Context/CartCount";
import { useRouter } from "next/navigation";

const paymentSchema = zod.object({
  city: zod.string().min(2, "City name must be at least 2 characters"),
  details: zod.string().min(10, "Address details must be at least 10 characters"),
  phone: zod
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
});

type PaymentFormData = zod.infer<typeof paymentSchema>;

const iconBox =
  "absolute left-4 flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500";

export default function PaymentForm({ cartId }: { cartId: string }) {
  const { method } = usePaymentMethod();
  const { setCount } = useContext(CartCounterProvider);
const router = useRouter()
  const { handleSubmit, control } = useForm<PaymentFormData>({
    defaultValues: { city: "", details: "", phone: "" },
    resolver: zodResolver(paymentSchema),
  });

  async function onSubmit(data: PaymentFormData) {
    try {
      const res = await PayOrder({ id: cartId, info: data });

      if (res.status === "success") {
        setCount(0);
    router.push("/order")
    } 
    } catch {
        "something went wrong"
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              City <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <div className={`${iconBox} top-1/2 -translate-y-1/2`}>
                <Building2 className="size-4" />
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Cairo, Alexandria, Giza"
                className="h-12 rounded-xl border-2! pl-14"
                autoComplete="off"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="details"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Street Address <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <div className={`${iconBox} top-4`}>
                <MapPin className="size-4" />
              </div>
              <Textarea
                {...field}
                id={field.name}
                rows={3}
                aria-invalid={fieldState.invalid}
                placeholder="Street name, building number, floor, apartment..."
                className="resize-none focus:border-main-color! border-2! focus:outline-none! focus:ring-0! rounded-xl pl-14"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Phone Number <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <div className={`${iconBox} top-1/2 -translate-y-1/2`}>
                <Phone className="size-4" />
              </div>
              <Input
                {...field}
                id={field.name}
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="01xxxxxxxxx"
                className="h-12 border-2! rounded-xl pl-14"
                autoComplete="off"
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}