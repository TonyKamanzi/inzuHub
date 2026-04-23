import React from "react";

export default function Testmonials() {
  const testmonials = [
    {
      name: "John Doe",
      role: "Tenant",
      feedback:
        '"This platform made finding a house so easy! The listings are accurate and the process was smooth."',
      ratingStars: 5,
    },

    {
      name: "Jane Smith",
      role: "Landlord",
      feedback:
        '"I was able to find reliable tenants quickly. The platform\'s features made managing my properties a breeze."',
      ratingStars: 4,
    },
    {
      name: "Emily Johnson",
      role: "Tenant",
      feedback:
        '"I love the variety of houses available. I found my dream home through this platform!"',
      ratingStars: 5,
    },
  ];
  return (
    <div className=" bg-gray-100 rounded-lg my-16 font-serif" id="testmonials">
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="bg-indigo-50 p-1 text-indigo-500 border rounded-full mx-auto  text-center text-xl w-max mb-5 shadow-md tracking-wider">
          Testmonials
        </h1>
        <h1 className="text-4xl text-center font-bold mb-10 tracking-wide text-gray-800">
          What Our Users Say
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Hear from our satisfied tenants and landlords about their experiences
          with our platform.
        </p>
      </div>
      <div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testmonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div className="flex">
                {Array.from({ length: testimonial.ratingStars }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09L5.64 12.545.762 9.91l6.09-.884L10 3l2.148 5.026 6.09.884-4.878 3.635L15.878 18z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.feedback}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
