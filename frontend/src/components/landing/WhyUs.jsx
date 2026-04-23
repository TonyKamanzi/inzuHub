import {
  Building2,
  Smartphone,
  Phone,
  Users,
  Star,
  Zap,
  Heart,
  Search,
} from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Trusted Landlords",
      description:
        "We partner with reputable landlords to ensure a safe and reliable renting experience.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "User-Friendly Platform",
      description:
        "Our intuitive platform makes it easy to search, compare, and apply for rentals.",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Engagement",
      description: "Join a vibrant community of renters and landlords.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Honest Reviews",
      description: "Read real and unbiased reviews from other tenants.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Listing Updates",
      description: "Stay updated with the latest rental listings in real-time.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Tenant Favorites",
      description: "Save your favorite listings and never lose track.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Easy Search and Filter",
      description:
        "Our advanced search and filter options help you find the perfect rental quickly and efficiently.",
    },
  ];
  return (
    <div className="bg-indigo-100 font-serif">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-lg text-indigo-500 border font-bold shadow-md bg-indigo-50 w-max px-2 mx-auto py-1 rounded-full mb-4">
          Why Us?
        </h1>
        <h2 className="text-3xl mx-auto w-max my-4 tracking-wider ">
          Why choose InzuHub?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300 hover:scale-105 hover:bg-indigo-50 hover:text-indigo-500 hover:cursor-pointer hover:shadow-indigo-300 hover:border hover:border-indigo-50"
          >
            <div className="p-3 bg-indigo-50 hover:bg-indigo-500 hover:text-white text-indigo-500 rounded-2xl transition duration-300 ">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mt-4 tracking-wider">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
