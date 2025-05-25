import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" className="search-form relative">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Srartups"
        className="text-black px-4 py-2 rounded-full font-semibold"
      />

      <div className="absolute  top-1/2 translate-x-36 -translate-y-4 flex gap-3">
        {query ? (
          <>
            <SearchFormReset></SearchFormReset>
            <button
              type="submit"
              className="bg-black text-white rounded-full p-2"
            >
              <Search className="size-5"></Search>
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="bg-black text-white rounded-full p-2 ml-12"
            >
              {" "}
              <Search className="size-5"></Search>
            </button>
          </>
        )}
      </div>
    </Form>
  );
}
