"use client"
import {useState } from "react";

export default function Home() {

  const [data, setData] = useState("");

    const handleApiClick = () => {
      console.log("api working");
      setData("click fired");
    }
    

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hello world</h1>
      <button onClick={handleApiClick}>Click to check api status</button>
      {data && 
      <h1>{data}</h1>
      }
    </main>
  );
}
