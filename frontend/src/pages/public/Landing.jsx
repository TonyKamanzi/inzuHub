import React from "react";
import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/landing/Hero";
import Houses from "../tenant/Houses";
import HowItWorks from "../../components/landing/HowItWorks";
import WhyUs from "../../components/landing/WhyUs";
import BecomeLandlord from "../landlord/BecomeLandlord";
import Testmonials from "../../components/landing/Testmonials";
import Footer from "../../components/shared/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Houses />
      <HowItWorks />
      <WhyUs />
      <BecomeLandlord />
      <Testmonials />
      <Footer />
    </>
  );
}
