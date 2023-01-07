import Link from "next/link";
import { FC } from "react";

const SideBar: FC = () => (
  <aside className="w-64 bg-gray-50 dark:bg-gray-800 rounded h-full">
    <div className="px-3 py-4 overflow-y-auto ">
      <ul className="space-y-2">
        <h2 className="px-4 font-bold text-gray-600 text-lg ">Navigation</h2>
        <li className="text-gray-900 text-base rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
          <Link href={'/'} passHref><span className="block">Home</span></Link>
        </li>
        <h2 className="px-4 font-bold text-gray-600 text-lg block ">Data Structures</h2>
        <li className="text-gray-900 text-base rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
          <Link href={'/ds/node'}><span className="block">Node</span></Link>
        </li>
        <li className="text-gray-900 text-base rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
          <Link href={'/ds/linkedlist'}><span className="block">Linked List</span></Link>
        </li>
        <h2 className="px-4 font-bold text-gray-600 text-lg ">Algorithms</h2>
        <li className="text-gray-900 text-base rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
          {/* <Link href={'/algo/test'}><span className="block">test</span></Link> */}
          <span className="cursor-not-allowed block">Coming soon</span>
        </li>
      </ul>
    </div>
  </aside >
);

export default SideBar;
