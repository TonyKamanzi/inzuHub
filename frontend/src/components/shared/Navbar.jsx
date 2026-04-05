import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-white  shadow shadow-gray-300 border-b-stone-200 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/">
          <img src="/logo.png" alt="inzuHub Logo" className="h-30 w-30" />
        </Link>
        <div>
          <ul className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500 font-bold tracking-wide">
              Home
            </Link>
            <Link to={"/houses"} className="text-gray-700 hover:text-blue-500 font-bold tracking-wide">
              Browse Houses
            </Link>
            <Link
              to={"/become-a-landlord"}
              className="text-gray-700 hover:text-blue-500 font-bold tracking-wide"
            >
              Become a Landlord
            </Link>
          </ul>
        </div>
        <div>
          <Link
            to="/login"
            className="text-gray-700 border border-blue-500 hover:bg-blue-500 hover:text-white  px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 shadow shadow-green-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
