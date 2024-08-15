"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddRestaurant from '../components/addRestaurant/AddRestaurant'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const Page = () => {

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push('/signin');
    } else {
      setLoading(false);
    }
  }, [session, status, router]);
  if(!loading){
    return (
      <div>
          <Navbar color={"gray-900"} />
        <AddRestaurant />
        <Footer />
      </div>
    )
  }
}

export default Page
