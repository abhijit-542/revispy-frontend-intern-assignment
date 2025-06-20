"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Themechangerbutton from "../Themchangebutton";
import { useEffect, useState } from "react";

const MobileNav = () => {
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
      {username && (
        <span className="cursor-pointer text-sm flex justify-end pt-2 pb-2.5">
          Hi, {name[0]}
        </span>
      )}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger>
              <AlignJustify className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href={"/"} className="font-bold flex-1">
                    ECOMMERCE
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-10 text-center">
                <SheetClose asChild>
                  <Link href="#">Categories</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#">Sale</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#">Clearance</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#">New stock</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#">Trending</Link>
                </SheetClose>

                <span className="cursor-pointer">Help</span>
                <span className="cursor-pointer">Orders & Returns</span>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href={"/"}
            className="font-bold lg:text-2xl sm:text-lg text-sm flex-1"
          >
            ECOMMERCE
          </Link>
        </div>
        <div className="flex gap-6 justify-end flex-1">
          <Search size={15} className="cursor-pointer" />
          <ShoppingCart size={15} className="cursor-pointer" />
          <Themechangerbutton />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
