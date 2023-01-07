"use client";

import type { FC } from "react";

const Page: FC = () => {
  return (
    <>
      <header>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Data sctructure and Algorithms visualizer
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          This project aims to provide a comprehensive visual format to
          illustrate Data Structures and Algorithms. By doing so, we hope to
          create an easy-to-follow resource for both novice and experienced
          users to better understand the fundamentals of data structures and
          algorithms. Through a series of diagrams, charts, and explanations,
          the goal is to help individuals gain a better understanding of these
          topics in a more accessible and visually appealing way.
        </p>
      </header>
      <main className="space-y-4">
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Tech behind this project</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>T3Stack</li>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Tailwind Css</li>
        </ul>
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Project by <span className="text-blue-600 dark:text-blue-500">Carlo Moleka</span></h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>
            <a
              href="https://github.com/cmoleka"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://carlomoleka.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Page;
