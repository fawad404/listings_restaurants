// app/admin/layout.js
import { Inter } from "next/font/google";
import "../globals.css"; // Ensure the path is correct
import Sidebar from "../components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard Description",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* <Sidebar /> */}
      <main className={inter.className}>
        <Sidebar />
        {children}
      </main>
    </div>
  );
}