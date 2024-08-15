
import Footer from '@/app/components/footer/Footer';
import Navbar from '@/app/components/navbar/Navbar';
import Single from '@/app/components/single/Single';



export async function generateMetadata({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/fetchRestaurants/${params.title}`);
  const result = await response.json();
  
  return {
    title: result.name,
    description: result.seoDescription,
  };
}

export default function Page ({ params }) {

  return (
    <div>
      <Navbar color={"gray-900"} />
       <Single singleRestaurant={params} />
      <Footer />
    </div>
  );
};


