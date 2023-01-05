import Link from "next/link";
import { FC } from "react";

const SideBar: FC = () => (
  <aside className="w-72 p-2 border-r-2 border-black h-full space-y-2">
    <h2 className="font-bold text-gray-600 text-lg ">Data Structures</h2>
    <ul className="list-none">
      <li className="">
        <Link href={'/ds/node'}>Node</Link>
      </li>
    </ul>
    <h2 className="font-bold text-gray-600 text-lg ">Algorithms</h2>
    <ul className="list-none">
      <li className="">item</li>
    </ul>
  </aside>
);

export default SideBar;
