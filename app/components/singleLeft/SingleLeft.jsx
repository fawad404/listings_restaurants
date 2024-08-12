import React from 'react'
import { CldImage } from "next-cloudinary";
const SingleLeft = ({ data }) => {
  return (
    <section className="is-relative py-20 overflow-hidden">
  <div className="is-relative">
    <div className="section">
      <div className="container">
        <div className="is-relative mx-auto">
        <CldImage
                      width="700"
                      height="384"
                      src={data.restaurantImg ? data.restaurantImg : ''}
                      sizes="100vw"
                      alt="Description of my image"
                    />
          <div className='w-3/4 mt-8'>
            <h3 className="text-lg font-semibold is-3 mb-6">{data.name}</h3>
            <p className="is-size-5 has-text-grey-dark">With this tool, you will get much better results at work and develop new skills. Will you take the risk of trying the latest version of our application?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default SingleLeft
