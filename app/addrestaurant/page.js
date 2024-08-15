import React from 'react'
import AddRestaurant from '../components/addRestaurant/AddRestaurant'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const Page = () => {
  return (
    <div>
        <Navbar color={"gray-900"} />
      <AddRestaurant />
      <Footer />
    </div>
  )
}

export default Page
