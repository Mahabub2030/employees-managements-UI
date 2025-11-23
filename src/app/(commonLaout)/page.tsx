import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Employee Management Systems</title>
        <meta
          name="description"
          content="Control and manage your workforce efficiently with our AI-powered employee management system including attendance tracking, performance evaluation, and payroll management ID Validation also ."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialities />
        <TopRatedDoctors />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
