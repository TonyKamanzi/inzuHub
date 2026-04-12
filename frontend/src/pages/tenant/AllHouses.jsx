import { useEffect, useState } from "react";
import { getHouses } from "../../api/Houseapi";
import HouseCard from "../../components/houses/HouseCard";
import Navbar from "../../components/shared/Navbar";

export default function AllHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await getHouses();
        setHouses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-500 text-lg font-medium">Loading houses...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto " id="houses">
        <div
          className="px-4 py-1 md:px-6 md:py-2 md:ml-140 ml-22 rounded-full mb-5
  bg-indigo-50 text-indigo-500 border  p-3 shadow-md  items-center gap-2 w-max flex justify-center text-xl"
        >
          Featured Houses
        </div>
        <h1 className="md:text-4xl text-center font-bold mb-10 tracking-wide text-gray-800">
          Explore Avaiable Houses
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Find your perfect home among our featured listings.
        </p>

        <div>
          {houses.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No houses available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {houses.map((house) => (
                <HouseCard
                  house={house}
                  key={house._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
