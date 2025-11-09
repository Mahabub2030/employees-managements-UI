"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-blue-600 text-white px-4 py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700 -z-10"></div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Modern Employee Management
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl max-w-3xl text-blue-100 mb-10">
        Streamline your workforce management with our comprehensive platform.{" "}
        <br className="hidden md:block" />
        Track, manage, and optimize your teams performance effortlessly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-6 rounded-xl text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          className="border-white text-black hover:bg-blue-700 font-medium px-6 py-6 rounded-xl text-lg"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
}
