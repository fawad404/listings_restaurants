import React from 'react'
import SingleLeft from '../singleLeft/SingleLeft'
import SingleRight from '../singleRight/SingleRight'

const Single = ({ singleRestaurant }) => {
  console.log(singleRestaurant);
  return (
    <section className="py-8">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap -mx-4 -mb-8">
      <div className="w-full md:w-2/3 px-4 mb-8">
       <SingleLeft data={singleRestaurant} />
      </div>
      <div className="w-full md:w-1/3 px-4 mb-8">
       <SingleRight data={singleRestaurant} />
      </div>
    </div>
  </div>
</section>
  )
}

export default Single
