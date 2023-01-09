import Link from "next/link";
import type { FC } from "react";

const SideBar: FC = () => (
  <aside className="w-64 rounded bg-gray-100 dark:bg-gray-800">
    <div className="overflow-y-auto px-3 py-4 ">
      <ul className="space-y-2">
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

export default SideBar;
