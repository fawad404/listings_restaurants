"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { signOut, useSession } from 'next-auth/react';
//import { signOut } from 'next-auth/react';
//import { useSession } from 'next-auth/react';
export default function Navbar({color}) {
   //const session = false; 
   
   //const user = session.data?.user
   
  // console.log(session);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "loading") {
//       // Show loading state while session status is being fetched
//       return;
//     }

//     if (session) {
//       // If no session, redirect to sign-in page
//       setIsLoggedIn(true);
//     }
//   }, [session, status]);

 
  return (
    <>

    <section>
      <nav className="relative py-6 bg-transparent mb-5 md:mb-8 z-50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center">
            <a className="inline-block text-lg font-bold" href="/">
              <img className="h-10" src="https://static.shuffle.dev/components/preview/2b35aa24-5fd8-403a-84a4-f9f9a56536bd/assets/public/artemis-assets/logos/artemis-logo.svg" alt="" width="auto" />
            </a>
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="flex w-12 h-12 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            <ul className="hidden lg:flex ml-14 lg:w-auto lg:space-x-12">
              <li className="group relative">
                <Link className={`inline-block text-sm text-${color} hover:text-orange-900 font-medium`} href="/about">About</Link>
                {/* <div className="hidden group-hover:block absolute top-full left-0 min-w-max max-w-xs p-4 z-50">
                  <div className="-mb-2 ml-8 w-4 h-4 rounded-sm bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  <div className="w-full max-w-xs bg-white border border-gray-100 rounded-3xl pt-4 pb-4 px-4">
                    <div className="pb-3 mb-3 border-b border-gray-100">
                        {categories.map((cat) => (
                      <Link className="block py-3 px-4 text-sm text-gray-900 hover:bg-orange-50 rounded-lg" href={`/blog/${cat.category}`} key={cat.id}>{cat.category}</Link>
                        ))}    
                         <Link className="block py-3 px-4 text-sm text-gray-900 hover:bg-orange-50 rounded-lg" href={`/blog`}>category 1</Link>
                   </div>
                    
                  </div>
                </div> */}
              </li>
              {/* <li><Link className={`inline-block text-sm text-${color} hover:text-orange-900 font-medium`} href="/investment">Investment</Link></li> */}
              <li><Link className={`inline-block text-sm text-${color} hover:text-orange-900 font-medium`} href="/contact">Contact</Link></li>
            </ul>
            
               <div className="hidden lg:block ml-auto">
               <div className="flex items-center">
                 {!isLoggedIn && (
                     <Link className={`relative group inline-block py-3 px-4 text-sm font-semibold text-${color} hover:text-orange-900 border border-gray-200 rounded-md overflow-hidden transition duration-300`} href="/signin">
                    <div className="absolute top-0 right-full w-full h-full bg-orange-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span className={`relative text-${color}`}
                     
                    >Sign In</span>
                  </Link>
                 )}
                {/* {session && 
                <Link className="inline-block mr-9 text-sm font-semibold text-orange-900 hover:text-gray-900" href="/editor">Write</Link>
                } */}
                { isLoggedIn && (
                  <>
                  
                 <Link className={`inline-block text-sm text-${color} hover:text-orange-900 font-medium mr-5`} href="/addrestaurant">
                   <span className="relative"
                    // onClick={signOut}
                   >Add Restaurant</span>
                 </Link>
                 <div className={`relative group inline-block py-3 px-4 text-sm font-semibold text-${color} hover:text-orange-900 border border-gray-200 rounded-md overflow-hidden transition duration-300`} href="/signout">
                 <div className="absolute top-0 right-full w-full h-full bg-orange-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                 <span className="relative"
                //    onClick={signOut}
                 >Sign Out</span>
               </div>
               </>
                )}
               
               </div>
             </div>
          </div>
        </div>
      </nav>
      <div className={`fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50 ${mobileNavOpen ? 'block' : 'hidden'}`}>
        <div onClick={() => setMobileNavOpen(!mobileNavOpen)} className="fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="relative flex flex-col py-6 px-10 w-full h-full bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-16">
            <a className="mr-auto text-2xl font-medium leading-none" href="/">
              <img className="h-10" src="https://static.shuffle.dev/components/preview/c6283f8f-6793-47ac-b2f0-908cc21b4d11/assets/public/saturn-assets/logos/logo-saturn-dark.svg" alt="" width="auto" />
            </a>
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul className="mb-2">
              
              <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/investment">Investment</Link></li>
              <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/about">About</Link></li>
              <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/contact">Contact</Link></li>
              {isLoggedIn && 
              <li><Link className="block py-4 px-5 text-gray-900 hover:bg-orange-50 rounded-lg" href="/admin">Admin</Link></li>
              }
            </ul>
            <div className="py-6 px-5">
              { isLoggedIn && 
              <Link className="block w-full py-4 px-6 mb-3 text-sm font-semibold text-orange-900 hover:text-white border border-gray-200 hover:bg-orange-900 rounded-md transition duration-200" href="/login"> Sign In</Link>
              }

              { !isLoggedIn && 
                <Link className="block w-full py-4 px-6 mb-3 text-sm font-semibold text-orange-900 hover:text-white border border-gray-200 hover:bg-orange-900 rounded-md transition duration-200" href="/login"> Sign In</Link>

              }
              
            </div>
          </div>
        </nav>
      </div>
    </section>
 
    </>
  );
}


