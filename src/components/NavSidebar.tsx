import React, { useState } from 'react';
import { Disclosure, Transition } from "@headlessui/react";

const NavSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex lg:hidden">
      <button onClick={() => setOpen(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      </button>
      <Transition show={open}>
        <Transition.Child
          className="fixed right-0 top-0 w-[250px] z-30 h-screen"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            id="sidebar"
            className={`fixed right-0 top-0 w-[250px] h-screen bg-blue-600 pt-20 p-6 z-50`}
          >
            <button
              onClick={() => setOpen(false)}
              aria-expanded={open}
              aria-controls="sidebar"
            >
              <img
                className="absolute top-5 right-5"
                src="/icon-close-menu.svg"
                alt="Close Menu"
              />
            </button>
            <ul className="flex flex-col space-y-3">
              <li className="hidden">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center text-left">
                        <span className="mr-4 text-white uppercase semi-bold">Articles</span>
                        <img
                          className=""
                          src={`/icon-arrow-${open ? "up" : "down"}.svg`}
                          alt="Arrow"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ul className="flex flex-col space-y-3">
                          <li className="cursor-pointer text-white uppercase semi-bold">
                            <a href="/articles">All</a>
                          </li>
                          <li className="cursor-pointer text-white uppercase semi-bold">
                            <a href="/obituaries">Obituaries</a>
                          </li>
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
              <li className="cursor-pointer text-white uppercase semi-bold">
                <a href="/articles">All Articles</a>
              </li>
              <li className="cursor-pointer text-white uppercase semi-bold">
                <a href="/newsletters">Newsletters</a>
              </li>
              <li className="cursor-pointer text-white uppercase semi-bold">
                <a href="/recollections">Recollections</a>
              </li>
              <li className="cursor-pointer text-white uppercase semi-bold">
                <a href="/lore">Lore</a>
              </li>
              <li className="cursor-pointer text-white uppercase semi-bold">
                <a href="/rambling-rose">Rambling Roses</a>
              </li>
              <li className="hidden">About</li>
            </ul>
          </div>

        </Transition.Child>
        <Transition.Child
          enter="transition-opacity ease-linear duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* ... */}
          <div
            onClick={() => setOpen(false)}
            className={`"w-full h-full fixed bg-black opacity-80 z-10 inset-0`}
          ></div>
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default NavSidebar;
