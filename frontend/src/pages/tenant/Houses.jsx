import { useEffect, useState } from "react";
import { getHouses } from "../../api/Houseapi";
import HouseCard from "../../components/houses/HouseCard";

export default function Houses() {
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
      <div className="flex justify-center items-center h-64 gap-4">
        <div className="text-indigo-500 bg-indigo-500 rounded-full w-5 h-5 animate-spin  " />
        <div className="text-indigo-500 bg-indigo-500 rounded-full w-5 h-5 animate-spin  " />
        <div className="text-indigo-500 bg-indigo-500 rounded-full w-5 h-5 animate-spin  " />
        <div className="text-indigo-500 text-xl">Loading houses...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-16">
      <div
        className="px-4 py-1 md:px-6 md:py-2 md:ml-140 ml-30 rounded-full mb-5
  bg-neutral-50 text-indigo-700 p-3 shadow-md  items-center gap-2 w-max flex justify-center text-xl"
      >
        Featured Houses
      </div>
      <h1 className="text-4xl text-center font-bold mb-10 tracking-wide text-gray-800">
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
  );
}
