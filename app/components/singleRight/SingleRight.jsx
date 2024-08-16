
import React from 'react'

const SingleRight = ({ data }) => {
    const tagsArray = data.tags[0].split(' ');
      // Convert service to a comma-separated string if it's an array
  const serviceDisplay = Array.isArray(data.service) ? data.service.join(', ') : data.service;

  return (
    <section className="py-8">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4 border border-blue-50">
        <div className="py-4 bg-white rounded">
          <div className="px-6 pb-6 border-b border-blue-50">
            <h3 className="text-xl font-bold">Restaurant Information</h3>
          </div>
          <div className="p-6 border-b border-blue-50">
            <div className="flex -mx-4">
              <div className="flex items-center w-1/2 px-4">
                <img className="mr-2 h-6" src="/website-click-svgrepo-com.svg" alt="" />
                <p className="text-sm font-medium">Website</p>
              </div>
              <div className="w-1/2 px-4">
                <p className="mb-1 text-sm text-indigo-500 font-medium">{data.website}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex -mx-4">
              <div className="flex items-center w-1/2 px-4">
                <img className="mr-2 h-6" src="/address-svgrepo-com (1).svg" alt="" />
                <p className="text-sm font-medium">Address</p>
              </div>
              <div className="w-1/2 px-4">
                <p className="mb-1 text-sm text-indigo-500 font-medium">{data.address}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex -mx-4">
              <div className="flex items-center w-1/2 px-4">
                <img className="mr-2 h-6" src="/type-square-svgrepo-com.svg" alt="" />
                <p className="text-sm font-medium">Restaurant Type</p>
              </div>
              <div className="w-1/2 px-4">
                <p className="mb-1 text-sm text-indigo-500 font-medium">restaurant</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex -mx-4">
              <div className="flex items-center w-1/2 px-4">
                <img className="mr-2 h-6" src="/service-desk-svgrepo-com.svg" alt="" />
                <p className="text-sm font-medium">Service</p>
              </div>
              <div className="w-1/2 px-4">
                <p className="mb-1 text-sm text-indigo-500 font-medium">
                {serviceDisplay}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex -mx-4">
              <div className="flex items-center w-1/2 px-4">
                <img className="mr-2 h-6" src="/tags-svgrepo-com.svg" alt="" />
                <p className="text-sm font-medium">Tags</p>
              </div>
              <div className="w-1/2 px-4">
              <p className="mb-1 text-sm text-indigo-500 font-medium">
                      {tagsArray.map((tag, index) => (
                        <span key={index} className="inline-block mr-2">
                          {tag}
                        </span>
                      ))}
                    </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default SingleRight