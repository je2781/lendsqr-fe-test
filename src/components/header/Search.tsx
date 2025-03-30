export default function SearchBar() {
  return (
    <div className="focus-within:border-2 focus-within:border-primary-500 w-[47%] mt-3 pr-0 border-2 lg:flex hidden flex-row items-center bg-transparent border-primary-400/15 rounded-md justify-between">
      <input
        className="pl-3 py-1 focus:outline-none placeholder:font-sans placeholder:text-sm h-full bg-transparent w-full"
        id="search"
        placeholder="Search for anything"
      />
      <span className="cursor-pointer bg-secondary-400 px-4 py-1 h-full rounded-br-md rounded-tr-md">
        <i className="fa-solid cursor-pointer fa-search text-sm text-white transition-all duration-300 ease-out transform hover:scale-110"></i>
      </span>
    </div>
  );
}
