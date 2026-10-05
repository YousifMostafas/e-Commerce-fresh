import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "./home.services";
import Slider from "@/components/swiper/Slider";
import { Headset, RotateCcw, Shield, ShieldHalf, Truck } from "lucide-react";
import FreshCard from "@/components/freshcard/FreshCard";
import { getAllCategories } from "./category.services";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import NewStellar from "@/components/NewStellar/NewStellar";
export const dynamic = "force-dynamic";
export default async function Home() {
  const data = await getAllProducts();
     const data2 =await getAllCategories()
  return (
    <>
      {/* Full-width slider */}
      <Slider />

      <div className="container px-12 mx-auto mt-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <Truck/>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Free Shipping
              </h3>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
<div className="bg-emerald-50 ml-2.5 md:ml-0 text-emerald-500 w-6 h-6 rounded-full flex items-center justify-center shrink-0"><svg data-prefix="fas" data-icon="shield-halved" className="svg-inline--fa fa-shield-halved " role="img" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" /></svg></div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Secure Payment
              </h3>
              <p className="text-xs text-gray-500">100% secure transactions</p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
           <RotateCcw/>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Easy Returns
              </h3>
              <p className="text-xs text-gray-500">14-day return policy</p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
        <Headset/>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                24/7 Support
              </h3>
              <p className="text-xs text-gray-500">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
   

      
   <div className="flex items-center gap-3 my-8 px-10">
  <div className="h-8 w-1.5 bg-linear-to-b  from-emerald-500 to-emerald-700 rounded-full" />
  <h2 className="text-3xl font-bold text-gray-800">Shop By <span className="text-emerald-600">Category</span></h2>
  </div>
     
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 px-8 my-10">
        {/* <CategoryCard category={data2} /> */}
        {data2.map((e)=>(< CategoryCard key={e._id} category={e}/>))}
      </div>
         

      <FreshCard/>

<div className="flex items-center gap-3 my-8 px-10">
  <div className="h-8 w-1.5 bg-linear-to-b  from-emerald-500 to-emerald-700 rounded-full" />
  <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-emerald-600">Products</span></h2></div>
      {/* Main content grid */}
      <div className="container mx-auto px-12 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((e) => (
            <ProductCard key={e._id} prod={e} />
          ))}
        </div>
      </div>

      <NewStellar/>
    </>
  );
}
