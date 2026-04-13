import React from "react";
import LandlordTopbar from "../../components/landlord/Topbar";
import HouseForm from "../../components/landlord/HouseForm";

export default function AddHouse() {
  return (
    <div>
      <LandlordTopbar title="Add New House" />
      <HouseForm mode="add" />
    </div>
  );
}
