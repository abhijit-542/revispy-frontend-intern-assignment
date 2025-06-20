"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Themechangerbutton from "../Themchangebutton";
import { useEffect, useState } from "react";

const DesktopNav = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUsername(user.name);
    }
  }, []);

  const name = username.split(" ");

  return (
    <>
      <nav className="container px-6 mx-auto">
        {/* Top row */}
        <div className="flex justify-end gap-6 pt-2 pb-2.5 text-xs">
          <span className="cursor-pointer">Help</span>
          <span className="cursor-pointer">Orders & Returns</span>
          {username && <span className="cursor-pointer">Hi, {name[0]}</span>}
        </div>
        {/* Main navigation */}
        <div className="flex items-center justify-between py-2">
          <Link href={"/"} className="font-bold text-2xl flex-1">
            ECOMMERCE
          </Link>

          <ul className="flex gap-8 justify-center font-semibold flex-1 text-sm">
            <li className="cursor-pointer">Categories</li>
            <li className="cursor-pointer">Sale</li>
            <li className="cursor-pointer">Clearance</li>
            <li className="cursor-pointer">New stock</li>
            <li className="cursor-pointer">Trending</li>
          </ul>

          <div className="flex gap-6 justify-end flex-1">
            <Search size={16} className="cursor-pointer" />
            <ShoppingCart size={16} className="cursor-pointer" />
            <Themechangerbutton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopNav;
