import { useEffect, useState } from "react";
import { getHouses } from "../../api/Houseapi";
import HouseCard from "../houses/HouseCard";
import { X } from "lucide-react";

export default function SearchResults({ searchParams, onClose }) {
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterHouses = async () => {
      try {
        const allHouses = await getHouses();
        let results = allHouses;

        // Filter by location (case-insensitive partial match)
        if (searchParams.location) {
          results = results.filter((house) =>
            house.location
              .toLowerCase()
              .includes(searchParams.location.toLowerCase()),
          );
        }

        // Filter by price
        if (searchParams.maxPrice) {
          // Find houses with price <= maxPrice
          const housesWithinBudget = results.filter(
            (house) => house.price <= searchParams.maxPrice,
          );

          // If exact matches found, use them
          if (housesWithinBudget.length > 0) {
            results = housesWithinBudget;
          } else {
            // If no exact matches, find the closest price below the max
            results = results.sort(
              (a, b) =>
                Math.abs(b.price - searchParams.maxPrice) -
                Math.abs(a.price - searchParams.maxPrice),
            );
          }
        }

        setFilteredHouses(results);
        setLoading(false);
      } catch (error) {
        console.error("Error filtering houses:", error);
        setLoading(false);
      }
    };

    filterHouses();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-500 text-lg font-medium">
          Searching houses...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* Header with close button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results
          </h2>
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-indigo-600">
              {filteredHouses.length}
            </span>{" "}
            house{filteredHouses.length !== 1 ? "s" : ""} matching your criteria
          </p>
          {searchParams.location && (
            <p className="text-sm text-gray-600 mt-1">
              📍 Location:{" "}
              <span className="font-medium">{searchParams.location}</span>
            </p>
          )}
          {searchParams.maxPrice && (
            <p className="text-sm text-gray-600">
              💰 Max Price:{" "}
              <span className="font-medium">
                {searchParams.maxPrice.toLocaleString()} RWF
              </span>
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition"
        >
          <X className="w-5 h-5" />
          Clear Search
        </button>
      </div>

      {/* Results Grid */}
      {filteredHouses.length === 0 ? (
        <div className="text-center py-12 bg-indigo-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">
            No houses found matching your criteria.
          </p>
          <p className="text-gray-500">
            Try adjusting your location or price range to see more results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHouses.map((house) => (
            <HouseCard house={house} key={house._id} />
          ))}
        </div>
      )}
    </div>
  );
}
