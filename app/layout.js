import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from './SessionProvider';
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}