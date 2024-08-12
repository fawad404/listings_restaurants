
import Link from 'next/link';
import Rating from '../ratings/Rating';
import { CldImage } from "next-cloudinary";
const Product = ({ fetchedRestaurants }) => {
  console.log(fetchedRestaurants ? fetchedRestaurants : [])
  if(!fetchedRestaurants){
    return <div><h1>Loading Restaurants....</h1></div>
  } else {
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
                  {fetchedRestaurants.map((list) => (
                    <div key={list._id} className="w-full mb-8">
                      <Link className="group block max-w-sm mx-auto md:max-w-none h-full border border-gray-100 bg-white rounded-xl transform hover:scale-105 transition duration-500" 
                      href={`/listings/${list._id}`}>
                        {/* <div className="flex items-center justify-between px-4 py-5">
                          <span className="text-sm">@fawad_ui</span>
                          <img src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/instagram-photos/icon-instagram.svg" alt="" />
                        </div> */}
                        <div className="h-55">
                        <CldImage
                      width="400"
                      height="72"
                      src={list.restaurantImg ? list.restaurantImg : ''}
                      sizes="100vw"
                      alt="Description of my image"
                    />
                        </div>
                        <button className="absolute z-10 top-[15px] left-[8px]  transform  flex items-center justify-center w-12 h-12 bg-white rounded-full border border-gray-200 hover:border-orange-900 transition duration-200">
                          <img src="https://static.shuffle.dev/components/preview/2f808e47-944e-42cf-b821-2358251e0600/assets/public/saturn-assets/images/instagram-photos/heart-icon.svg" alt="" />
                        </button>
                        <div className="px-4 pt-4 pb-5">
                          <div className="flex justify-between">
                            <span className="block text-sm text-gray-800 mb-2.5">American</span>
                            <span className="text-sm text-gray-500">Closed Now</span>
                          </div>
                        </div>
                        <div className="px-4 pt-4 pb-5">
                          <div className="flex justify-between">
                            <span className="block text-sm text-gray-800 mb-2.5">{list.name}</span>
                            <span className="text-sm text-gray-500">{list.city}</span>
                          </div>
                        </div>
                        <div className="px-4 pt-4 pb-5">
                          <div className="flex justify-between">
                            <Rating />
                            <span className="text-sm text-gray-500">...</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
};

export default Product;
