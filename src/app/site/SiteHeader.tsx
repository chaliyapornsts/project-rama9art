"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import siteMenuItems from "@/app/data/site-menu-items.json";

export default function SiteHeader() {
  const [search, setSearch] = useState("");
  const [isOpenMenu, setCloseMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeLink, setActiveLink] = useState("/");

  const openMenu = () => {
    setCloseMenu(!isOpenMenu);
  };

  const closeMenu = () => {
    setCloseMenu(false);
  };

  return (
    <header className="bg-white border-b h-20">
      <div className="pl-4 pr-4 lg:pl-10 lg:pr-10 pt-4">
        <div className="text-sm flex justify-between h-14">
          <div className="flex h-full">
            <div className="xl:hidden flex items-center pr-5">
              <Menu onClick={openMenu} aria-label="Open Menu" />
              <div
                className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpenMenu ? 'translate-x-0' : '-translate-x-full'}`}
              >
                <div className="flex justify-end p-4">
                  <X onClick={closeMenu} aria-label="Close Menu" />
                </div>
                <nav className="flex flex-col p-4">
                  {siteMenuItems.map((menuItem) => (
                    <Link
                      key={menuItem.title}
                      href={menuItem.href}
                      className={`py-2 text-lg ${activeLink === menuItem.href ? "text-orange-500" : "hover:text-orange-500"}`}
                      onClick={() => {
                        setActiveMenu(menuItem.title);
                        setActiveLink(menuItem.href);
                        closeMenu();
                      }}
                    >
                      {menuItem.title}
                    </Link>
                  ))}
                </nav>
              </div>
              {isOpenMenu && (
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={closeMenu}
                ></div>
              )}
            </div>
            <div className="flex h-full pr-3 font-bold">
              <h1 className={`font-semibold self-center ${activeLink === '/' ? 'text-black' : ''}`}>
                <Link
                  href="/"
                  onClick={() => setActiveLink('/')}
                >
                  Rama IX Art Foundation
                </Link>
              </h1>
            </div>
            <nav className="hidden xl:flex">
              {siteMenuItems.map((menuItem) => (
                <div
                  key={menuItem.title}
                  className={`flex h-full mx-3 ${activeLink === menuItem.href ? "text-orange-500" : "hover:text-orange-500"}`}
                >
                  <Link
                    href={menuItem.href}
                    className="self-center"
                    onClick={() => {
                      setActiveMenu(menuItem.title);
                      setActiveLink(menuItem.href);
                    }}
                  >
                    {menuItem.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className="w-full max-w-96">
            <div className="flex h-full items-center justify-end">
              <div className="relative w-full">
                {search === "" && <Search className="absolute right-3 top-1/2 transform -translate-y-1/2" />}
                <Input
                  type="search"
                  className="rounded-lg p-2 bg-gray-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
