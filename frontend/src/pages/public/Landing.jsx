import React from "react";
import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/landing/Hero";
import Houses from "../tenant/Houses";
import HowItWorks from "../../components/landing/HowItWorks";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Houses />
      <HowItWorks />
    </>
  );
}
