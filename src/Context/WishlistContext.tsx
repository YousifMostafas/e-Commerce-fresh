import { getAllWishlist } from "@/app/wishlist/wishlis.acton";
import { createContext, useEffect, useState } from "react";
export const WishlistCounterProvider = createContext<{
  wishcount: number;
  setWishCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  wishcount: 0,
  setWishCount: () => {},
});
export default function WishlistCount({ children }: { children: React.ReactNode }) {
  const [wishcount, setWishCount] = useState(0);

useEffect(() => {
  getAllWishlist()
    .then((res) => {
      console.log("wishlist response:", res); 
      setWishCount(res.count );
    })
    .catch((err) => {
      console.log("wishlist error:", err);
      setWishCount(0);
    });
}, []);

  return (
    <WishlistCounterProvider value={{ wishcount, setWishCount }}>
      {children}
    </WishlistCounterProvider>
  );
}