import React from 'react';
import Rating from '../ratings/Rating';

const Product = () => {
  const lists = [1, 2, 3];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="text-center mb-18">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">SOCIAL MEDIA</span>
          <h1 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span>Hot & Fresh Local Business</span>
          </h1>
          <p className="text-gray-500 mb-10">here is description for this section</p>
        </div>
        <div className="relative max-w-sm sm:max-w-7xl mx-auto">
          <div className="px-6">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lists.map((list) => (
                  <div key={list} className="w-full">
                    <a className="group block max-w-sm mx-auto md:max-w-none h-full border border-gray-100 bg-white rounded-xl transform hover:scale-105 transition duration-500" href="#">
                      <div className="flex items-center justify-between px-4 py-5">
                        <span className="text-sm">@fawad_ui</span>
                        <img src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/instagram-photos/icon-instagram.svg" alt="" />
                      </div>
                      <div className="h-72">
                        <img className="block w-full h-full" src="https://restaurantpro.listingprowp.com/wp-content/uploads/2018/08/348s-351-348x240.jpg" alt="" />
                      </div>
                      <button className="absolute z-10 top-[70px] left-[8px]  transform  flex items-center justify-center w-12 h-12 bg-white rounded-full border border-gray-200 hover:border-orange-900 transition duration-200">
                        <img src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/instagram-photos/heart-icon.svg" alt="" />
                      </button>
                      <div className="px-4 pt-4 pb-5">
                        <div className="flex justify-between">
                          <span className="block text-sm text-gray-800 mb-2.5">American</span>
                          <span className="text-sm text-gray-500">Closed Now</span>
                        </div>
                      </div>
                      <div className="px-4 pt-4 pb-5">
                        <div className="flex justify-start">
                          <span className="block text-sm text-gray-800 mb-2.5 mr-3">LuisaÕs Pizza And Pasta</span>
                          <span className="text-sm text-gray-500">Cimg</span>
                        </div>
                      </div>
                      <div className="px-4 pt-4 pb-5">
                        <div className="flex justify-between">
                          <Rating />
                          <span className="text-sm text-gray-500">Cimg</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
