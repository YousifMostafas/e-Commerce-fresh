import Image from "next/image";
import { getRelatedProducts, getSingleProduct } from "../productDetails.services";
import {
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  House,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldHalf,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import AppButton from "@/components/AppButton/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageSwiper from "@/components/swiper/ImageSwiper";
import ProductsSlider from "@/components/ProductsSlider/ProductsSlider";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import AddToCartSection from "../AddToCartSection";

export default async function page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSingleProduct(id);
const related = (await getRelatedProducts(data.category._id)).filter(
  (p) => p._id !== id,
);
  const {
    imageCover,
    description,
    ratingsAverage,
    ratingsQuantity,
    quantity,
    price,
    brand,
    category,
    subcategory,
    title,
    sold,
    images
  } = data;
  console.log(data);
  return (
    <>
   <div className="w-full overflow-x-clip mt-20 ">
   <ol className="flex items-center md:px-10  gap-1 text-sm">
          <li className="flex items-center">
            <Link href={"/"} className="text-gray-500 hover:text-primary-600 hover:text-main-color  transition flex items-center gap-1.5">
              <House className="size-4 bg-gray-text-[#6A7282]" />
              Home
            </Link>
            <ChevronRight className="text-gray-500 size-4" />
          </li>
          <li className="flex items-center">
            <p className="text-gray-500 cursor-pointer  transition hover:text-main-color flex items-center gap-1.5">
              {category.name}
            </p>
            <ChevronRight className="text-gray-500 size-4" />
          </li>
          <li className="flex items-center">
            <p className="text-gray-500 font-medium transition cursor-pointer hover:text-main-color flex items-center gap-1.5">
              {subcategory.map((item) => item.name).join(", ")}
            </p>
            <ChevronRight className="text-gray-500 size-4" />
          </li>
          <li className="text-gray-900 font-medium truncate max-w-xs">
            {title}
          </li>
        </ol>
   <div className="container mx-auto p-4">
         
      </div>
      <div className="grid grid-cols-12 ">
    <div className="col-span-12 md:col-span-3 p-4 md:p-8">
  <div className="md:sticky md:top-24">
<ImageSwiper imageCover={imageCover} images={images} title={title} />
  </div>
</div>
        <div className=" col-span-12 md:col-span-9 min-w-0 p-4 md:p-8 ">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <p className="text-main-color bg-emerald-50 text-xs px-3 py-1.5 rounded-full hover:bg-[#DCFCE7] transition">
                {category.name}
              </p>
              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                {brand.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center my-3 gap-0.5">
              {Array.from(
                { length: Math.floor(ratingsAverage ?? 0) },
                (_, index) => (
                  <Star
                    key={index}
                    className="h-4.5 w-4.5 fill-yellow-400 text-yellow-400"
                  />
                ),
              )}
              {Array.from(
                { length: 5 - Math.floor(ratingsAverage ?? 0) },
                (_, index) => (
                  <Star key={index} className="h-4.5 w-4.5  text-yellow-400" />
                ),
              )}
              <span className="text-[#6A7282] ml-2 text-sm font-semibold ">
                {ratingsAverage}
              </span>
              <span className="text-[#6A7282] text-sm font-semibold">
                ({ratingsQuantity} reviews)
              </span>
            </div>
            <h1 className="text-3xl font-bold">{price} EGP</h1>

            <div className="flex items-center gap-2 my-6">
              <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                In Stock
              </span>
            </div>
            <p className="text-gray-600  ">{description}</p>
            <p className="text-gray-600 my-5 text-sm">Quantity</p>

        <AddToCartSection productId={id} price={price} quantity={quantity}>
  <AppButton className="bg-[#101828] hover:bg-[#1E2939] duration-300 transition-all w-1/2 py-6.5 rounded-xl font-bold">
    <Zap className="size-5" /> Buy Now
  </AppButton>
</AddToCartSection>
            <div className="flex w-full justify-between items-center mt-4 gap-2 ">
              <AppButton className="bg-white text-gray-700 hover:text-main-color hover:border hover:bg-white hover:border-main-color   flex-1  py-6  rounded-xl font-medium">
                <Heart className="size-5" />
                Add To WishList
              </AppButton>
              <AppButton className="bg-white text-gray-700 hover:text-main-color hover:border hover:bg-white hover:border-main-color   px-4 py-6 rounded-xl font-bold">
                {" "}
                <Share2 className="size-5" />
              </AppButton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 mt-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <Truck />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Free Delivery
                  </h4>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <RotateCcw />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    30 Days Return
                  </h4>
                  <p className="text-xs text-gray-500">Money back</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <ShieldHalf />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-gray-500">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto mt-7">
    <Tabs defaultValue="overview" className="w-full">
  <TabsList className="h-auto w-full md:w-fit">
    <TabsTrigger
      value="overview"
      className="gap-1.5 px-2 py-2 text-xs font-medium sm:text-sm md:mx-10 md:text-base"
    >
      <Briefcase className="hidden size-4 sm:block" />
      <span className="sm:hidden">Details</span>
      <span className="hidden sm:inline">Product Details</span>
    </TabsTrigger>

    <TabsTrigger
      value="analytics"
      className="gap-1.5 px-2 py-2 text-xs font-medium sm:text-sm md:text-base"
    >
      <Star className="hidden size-4 sm:block" />
      Reviews ({ratingsQuantity})
    </TabsTrigger>

    <TabsTrigger
      value="reports"
      className="gap-1.5 px-2 py-2 text-xs font-medium sm:text-sm md:mx-10 md:text-base"
    >
      <Truck className="hidden size-4 sm:block" />
      <span className="sm:hidden">Shipping</span>
      <span className="hidden sm:inline">Shipping & Returns</span>
    </TabsTrigger>
  </TabsList>
          <TabsContent value="overview" className="w-full px-0 md:px-8">
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this Product
                </h3>
                <p className="text-gray-600 text-lg= font-medium leading-relaxed">
                  Material Polyester Blend Colour Name Multicolou Department
                  Women
                </p>
              </div>
            </div>
            <div>
              <p />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Product Information
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Category</span>
                      <span className="text-gray-900 font-medium">
                        {category.name}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Subcategory</span>
                      <span className="text-gray-900 font-medium">
                        {subcategory.map((item) => item.name).join(", ")}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Brand</span>
                      <span className="text-gray-900 font-medium">
                        {brand.name}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Items Sold</span>
                      <span className="text-gray-900 font-medium">
                        {sold}+ sold
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 text-main-color" />
                      Premium Quality Product
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 text-main-color" />
                      100% Authentic Guarantee
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 text-main-color" />
                      Fast &amp; Secure Packaging
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 text-main-color" />
                      Quality Tested
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="w-full px-0 md:px-8">
            <div className="space-y-6 mt-7 ">
              <div className="flex flex-col md:flex-row gap-8 ">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {ratingsAverage}
                  </div>
                  <div className="flex items-center justify-center my-3 gap-0.5">
                    {Array.from(
                      { length: Math.floor(ratingsAverage ?? 0) },
                      (_, index) => (
                        <Star
                          key={index}
                          className="h-4.5 w-4.5 fill-yellow-400 text-yellow-400"
                        />
                      ),
                    )}
                    {Array.from(
                      { length: 5 - Math.floor(ratingsAverage ?? 0) },
                      (_, index) => (
                        <Star
                          key={index}
                          className="h-4.5 w-4.5  text-yellow-400"
                        />
                      ),
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-500 mt-2">
                    Based on {ratingsQuantity} reviews
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">5 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: "25%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">25%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">4 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">60%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">3 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: "25%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">25%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">2 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: "5%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">5%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">1 star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: "5%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">5%</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="text-center py-8">
                  <Star className=" m-auto w-9 h-9 mb-3  fill-gray-300 text-gray-300 " />

                  <p className="text-gray-500 font-medium text-base">
                    Customer reviews will be displayed here.
                  </p>
                  <button className="mt-4 text-emerald-600 hover:text-emerald-700  text-base font-medium">
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="mt-5 w-full px-0 md:px-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-linear-to-br from-emerald-50/50 to-emerald-100/70 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-main-color text-white rounded-full flex items-center justify-center">
                   <Truck/>
                    </div>
                    <h4 className="font-semibold text-base text-gray-900">
                      Shipping Information
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 font-medium text-sm text-gray-700">
                 <Check className="text-main-color size-5"/>
                      <span>Free shipping on orders over $50</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                                     <Check className="text-main-color size-5"/>

                      <span>Standard delivery: 3-5 business days</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                                     <Check className="text-main-color size-5"/>

                      <span>
                        Express delivery available (1-2 business days)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
                                   <Check className="text-main-color size-5"/>

                      <span>Track your order in real-time</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                   <RotateCcw />
                    </div>
                    <h4 className="font-semibold text-base text-gray-900">
                      Returns &amp; Refunds
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 font-medium text-sm text-gray-700">
                                   <Check className="text-main-color size-5"/>

                      <span>30-day hassle-free returns</span>
                    </li>
                    <li className="flex items-start font-medium gap-2 text-sm text-gray-700">
                                 <Check className="text-main-color size-5"/>

                      <span>Full refund or exchange available</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                                    <Check className="text-main-color size-5"/>

                      <span>Free return shipping on defective items</span>
                    </li>
                    <li className="flex items-start gap-2 font-medium text-sm text-gray-700">
                                      <Check className="text-main-color size-5"/>

                      <span>Easy online return process</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldHalf/>
                </div>
                <div>
                  <h4 className="font-semibold text-base text-gray-900 mb-1">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-sm font-medium text-gray-600">
                    Get a full refund if your order doesn't arrive or isn't as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
      
        </Tabs>
      </div>
      {/* productsByCategory */}



  <div className="">
      
{related.length > 0 && (
  <ProductsSlider
    title="You May Also"
    highlight="Like"
    items={related.map((product) => (
      <ProductCard key={product._id} prod={product} />
    ))}
  />
)}

    </div> 
   </div>
       
       


   
    </>
  );
}
