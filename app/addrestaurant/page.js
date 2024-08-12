import React from 'react'
import AddRestaurant from '../components/addRestaurant/AddRestaurant'
import Navbar from '../components/navbar/Navbar'

const Page = () => {
  return (
    <div>
        <Navbar color={"gray-900"} />
      <AddRestaurant />
    </div>
  )
}

export default Page
