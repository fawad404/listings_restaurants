// app/admin/layout.js
"use client"
import { Inter } from "next/font/google";
import "../globals.css"; // Ensure the path is correct
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });


export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    }
  
    if (!session) {
      router.push('/');
    } else {
      const fetchUserId = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/getUsers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.user.email }),
          });
  
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
  
          const data = await res.json();
          setUserData(data);
          if(!data){
            router.push('/');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUserId();
    }
  }, [session, status, router]);
  
  return (
    <div className="admin-layout">
      {/* <Sidebar /> */}
      <main className={inter.className}>
        {userData && 
        <>
          <Sidebar />
        {children}
        </>
        }
      </main>
    </div>
  );
}