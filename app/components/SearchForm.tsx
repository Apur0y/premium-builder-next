import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

export default function SearchForm({query}:{query? :string}) {

 

    

  return (
    <Form action="/" className="search-form relative">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Srartups"
        className="text-black px-4 py-2 rounded-full font-semibold"
      />

      <div className="absolute  top-1/2 translate-x-36 -translate-y-4 flex gap-3">
        {
            query? (<>
              <SearchFormReset></SearchFormReset>
            <button type="submit" className="bg-black text-white rounded-full px-3 py-1">S</button>
            </>              
            ):(
                <>
                      <button type="submit" className="bg-black text-white rounded-full px-3 py-1 ml-12">S</button>
                </>
            )   
            
        }
              


      </div>
      
    </Form>
  );
}
