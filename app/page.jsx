"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <section className="w-full flex-center flex-col h-screen">
      <h1 className="head_text text-center">
        TrackIt
        <br className="max-md:hidden" />
        <span className="purple_gradient text-center">
          {" "}
          Your Modern Financial Tracker
        </span>
      </h1>

      <p className="desc text-center">
        TrackIt is an app for the modern world to plan, visualize, and innovate
        financial habits.
      </p>

      <div className="flex-center mt-10 space-x-4">
        <button
          className="outline_btn"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Try it Now!
        </button>
        <button
          className="black_btn"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Home;
