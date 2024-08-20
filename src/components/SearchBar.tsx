import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input className="absolute inset-0 h-full" />
        <Button className="absolute right-0 inset-y-0 h-full rounded-l-none" />
      </div>
    </div>
  );
};

export default SearchBar;
