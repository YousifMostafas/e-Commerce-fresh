import Image from "next/image";
import { Product } from "../addtocart/addtocart.interface";

export default function PaymentRow({ prod }: { prod: Product }) {
  const {
    product: { imageCover, title },
    price,
    count,
  } = prod;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="relative w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
        <Image
          src={imageCover}
          alt={title}
          fill
          sizes="56px"
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {count} × {price} EGP
        </p>
      </div>
      <p className="text-sm font-bold text-gray-900 shrink-0">
        {count * price}
      </p>
    </div>
  );
}