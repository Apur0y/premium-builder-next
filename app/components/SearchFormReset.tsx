"use client";

import Link from "next/link";

const SearchFormReset = () => {
    const reset =()=>{
            const form = document.querySelector(".search-form") as HTMLFormElement;
    
            if(form) {
                form.reset();
            }
        }
    return (
        <div>
            <button className="bg-black text-white rounded-full px-3 py-1" type="reset" onClick={reset}>

                <Link href='/'>X</Link>
            </button>
        </div>
    );
};

export default SearchFormReset;