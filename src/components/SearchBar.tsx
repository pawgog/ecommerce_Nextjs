"use client";

import { KeyboardEvent, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(defaultQuery);
  const [isSearching, setTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = () => {
    setTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
    if (e.key === "Escape") {
      inputRef?.current?.blur();
    }
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          value={query}
          ref={inputRef}
          disabled={isSearching}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
          className="absolute inset-0 h-full"
        />
        <Button
          onClick={search}
          disabled={isSearching}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isSearching ? (
            <Loader className="w-6 h-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
