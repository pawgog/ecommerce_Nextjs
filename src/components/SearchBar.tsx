"use client";

import { KeyboardEvent, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [query, setQuery] = useState();
  const [isSearching, setTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      inputRef?.current?.blur();
    }
  };

  const search = () => {
    setTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          ref={inputRef}
          onKeyUp={(e) => handleKeyUp(e)}
          className="absolute inset-0 h-full"
        />
        <Button className="absolute right-0 inset-y-0 h-full rounded-l-none">
          <Search className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
