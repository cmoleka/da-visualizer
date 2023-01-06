"use client";

import type { FC } from "react";

const Page: FC = () => {
  return (
    <section className="container mx-auto w-full p-2">
      <header>
        <h1 className="text-2xl font-bold">
          Data sctructure and Algorithms visualizer
        </h1>
        <p className="text-lg">
          This project aims to provide a comprehensive visual format to
          illustrate Data Structures and Algorithms. By doing so, we hope to
          create an easy-to-follow resource for both novice and experienced
          users to better understand the fundamentals of data structures and
          algorithms. Through a series of diagrams, charts, and explanations,
          the goal is to help individuals gain a better understanding of these
          topics in a more accessible and visually appealing way.
        </p>
      </header>
      <main className="">
        <h2 className="text-xl font-bold">Tech behind this project</h2>
        <ul className="list-inside list-disc">
          <li>T3Stack</li>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Tailwind Css</li>
        </ul>
        <h2 className="text-xl font-bold">Project by</h2>
        <ul className="list-inside list-disc">
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
    </section>
  );
};

export default Page;
