import { Verified, Search } from "lucide-react";
export default function Hero() {
  return (
    <section class="relative overflow-hidden bg-linear-to-br from-indigo-900 via-indigo-700 to-purple-800 px-6 py-20">
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl translate-y-32 -translate-x-16"></div>

      <div class="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-indigo-200 px-4 py-1 rounded-full text-sm mb-5 backdrop-blur">
            ⭐ Rwanda's #1 Rental Platform
          </div>

          <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Find Your Perfect <span class="text-yellow-300">Home</span> in
            Rwanda
          </h1>

          <p class="text-indigo-200 mb-8 max-w-md">
            Browse verified houses, connect with trusted landlords, and move in
            with confidence — all in one place.
          </p>

          <div class="flex flex-wrap gap-4 mb-8">
            <a
              href="#"
              class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <Search /> Browse Houses
            </a>

            <a
              href="#"
              class="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl backdrop-blur hover:bg-white/20 w-full md:w-auto flex items-center gap-2 justify-center shadow-lg "
            >
              ➕ List Property
            </a>
          </div>

          <div class="bg-white/10 border border-white/20 backdrop-blur rounded-xl p-3 flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Location(e.g., Kigali, Butare, Rubavu)"
              class="flex-1 min-w-30 px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/60 outline-none"
            />

            <select class="px-4 py-2 rounded-lg  bg-white/70 backdrop:blur-md  text-gray-800">
              <option value="">Max Price(RWF)</option>
              <option value="">150,000 RWF</option>
              <option value="">200,000 RWF</option>
              <option value="">250,000 RWF</option>
              <option value="">300,000 RWF</option>
              <option value="">350,000 RWF</option>
              <option value="">400,000 RWF</option>
              <option value="">450,000 RWF</option>
              <option value="">500,000 RWF</option>
              <option value="">Above</option>
            </select>

            <button class="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-gray-900 cursor-pointer">
              <Search /> Search
            </button>
          </div>

          <div class="flex gap-6 mt-8 text-white">
            <div>
              <p class="text-2xl font-bold">2,400+</p>
              <span class="text-indigo-300 text-sm">Houses</span>
            </div>
            <div>
              <p class="text-2xl font-bold">1,800+</p>
              <span class="text-indigo-300 text-sm">Tenants</span>
            </div>
            <div>
              <p class="text-2xl font-bold">650+</p>
              <span class="text-indigo-300 text-sm">Landlords</span>
            </div>
          </div>
        </div>

        <div class="relative hidden md:flex justify-center">
          <div class=" rounded-2xl shadow-2xl p-5 animate-[float_4s_ease-in-out_infinite]">
            <img src="/logo.png" class="rounded-xl w-full max-w-sm" />
          </div>

          <div class="absolute top-0 right-0 bg-white px-4 py-2 rounded-xl shadow-lg text-sm flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            24 New Listings
          </div>

          <div class="absolute bottom-0 left-0 bg-white px-4 py-2 rounded-xl shadow-lg text-sm animate-[float_5s_ease-in-out_infinite] flex items-center gap-2">
            <Verified class="w-4 h-4 text-green-500" />
            Verified Properties
          </div>
        </div>
      </div>
    </section>
  );
}
