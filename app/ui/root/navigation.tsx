export function NavigationBar() {
  return (
    <div className="top-0 pl-10 pr-10 bg-blue-100 w-full h-16 shadow-md flex justify-between items-center">
      <div className="font-bold text-2xl antialiased text-blue-800 uppercase select-none">
        Wheater-Next
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search City.."
          className="p-2 rounded-md "
        />
        <button className="cursor-pointer p-2 border border-blue-800 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white">
          Search
        </button>
      </div>
    </div>
  );
}
