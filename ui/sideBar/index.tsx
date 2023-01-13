'use client';

import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import classNames from 'classnames';

const SideBar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleMenuCollapse = () => {
    setIsCollapsed(!isCollapsed)
  };

  const menuMobileClass = classNames({
    'hidden  ': isCollapsed,
    'block': !isCollapsed
  })


  return (

    <aside className={`w-full  md:w-64 py-4 md:py-0  rounded bg-gray-100 dark:bg-gray-800`}>
      <button onClick={() => handleMenuCollapse()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className={`${menuMobileClass} md:block overflow-y-auto px-3 py-4 `}>
        <ul className="space-y-2 " id="navbar-default">
          <h2 className="px-4 text-lg font-bold text-gray-600 dark:text-gray-200">
            Navigation
          </h2>
          <li className="block rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link href={"/"} passHref>
              <span className="block">Home</span>
            </Link>
          </li>
          <h2 className="block px-4 text-lg font-bold text-gray-600 dark:text-gray-200 ">
            Data Structures
          </h2>
          <li className="block rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link href={"/ds/node"}>
              <span className="block">Node</span>
            </Link>
          </li>
          <li className="block rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link href={"/ds/linkedlist"}>
              <span className="block">Linked List</span>
            </Link>
          </li>
          <li className="block rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link href={"/ds/queue"}>
              <span className="block">Queue</span>
            </Link>
          </li>
          <h2 className="px-4 text-lg font-bold text-gray-600  dark:text-gray-200">
            Algorithms
          </h2>
          <li className="block rounded-lg px-4 py-2 text-base text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
            {/* <Link href={'/algo/test'}><span className="block">test</span></Link> */}
            <span className="block cursor-not-allowed">Coming soon</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
