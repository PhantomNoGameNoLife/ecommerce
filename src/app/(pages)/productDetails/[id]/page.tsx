import { getSingleProducts } from "@/apis/productsApi";
import ProductCounter from "@/app/_components/counter/ProductCounter";
import SwiperClient from "@/app/_components/swiperClient/ProductSlider";
import { Button } from "@/components/ui/button";
import { BadgeCheck , ShoppingCart } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getSingleProducts(id);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full h-full max-lg:mx-auto mx-0">
            <div className="relative mb-6 border border-chart-1 rounded-2xl">
              <SwiperClient images={data.images} />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="text">
                  <h2 className="font-bold text-3xl leading-10 text-primary mb-2">
                    {data.title}
                  </h2>
                  <p className="font-normal text-base text-muted-foreground">
                    {data.category.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                <h5 className="font-semibold text-3xl text-primary me-3">
                  {data.price}
                  <sub>EGP</sub>{" "}
                </h5>
                <div className="flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
                  <FaStar className="text-primary-foreground" />
                  <span className="text-base font-medium text-primary-foreground">
                    4.8
                  </span>
                  <span className="pl-2 font-normal text-primary-foreground text-sm ">
                    {data.ratingsQuantity} Ratings
                  </span>
                </div>
              </div>
              <p className="font-medium text-xl leading-8 text-primary mb-2 line-clamp-3">
                {data.description}
              </p>
              <ul className="grid gap-y-4 !my-8">
                <li className="flex items-center gap-3">
                  <BadgeCheck />
                  <span className="font-normal text-base text-primary ">
                    Brand: {data.brand.name}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <BadgeCheck />
                  <span className="font-normal text-base text-primary ">
                    Quantity: {data.quantity}
                  </span>
                </li>
              </ul>
              <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                <ProductCounter />
                <Button variant={"secondary"} className="w-7/12 min-[400px]:grow my-2 min-[400px]:my-0 py-6 px-5 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                  <ShoppingCart />
                  Add to cart
                </Button>
              </div>
              <Button className="text-center w-full px-5 py-7 rounded-[100px] flex items-center justify-center font-semibold text-lg shadow-sm cursor-pointer">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
