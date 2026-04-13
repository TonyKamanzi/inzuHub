import React, { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/landing/Hero";
import SearchResults from "../../components/landing/SearchResults";
import Houses from "../tenant/Houses";
import HowItWorks from "../../components/landing/HowItWorks";
import WhyUs from "../../components/landing/WhyUs";
import BecomeLandlord from "../landlord/BecomeLandlord";
import Testmonials from "../../components/landing/Testmonials";
import Footer from "../../components/shared/Footer";

export default function Landing() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleClearSearch = () => {
    setSearchParams(null);
  };

  return (
    <>
      <Navbar />
      <Hero onSearch={handleSearch} />
      {searchParams && (
        <SearchResults
          searchParams={searchParams}
          onClose={handleClearSearch}
        />
      )}
      {!searchParams && <Houses />}
      <HowItWorks />
      <WhyUs />
      <BecomeLandlord />
      <Testmonials />
      <Footer />
    </>
  );
}
