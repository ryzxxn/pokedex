import { Inter } from "next/font/google";
import "./globals.css";

const inter = ({ subsets: ["latin"] });

export const metadata = {
  title: "Pokedex",
  description: "pokedexDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
