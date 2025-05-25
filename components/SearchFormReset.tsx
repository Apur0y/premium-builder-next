"use client";

import { X } from "lucide-react";
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
            <button className="bg-black text-white rounded-full p-2" type="reset" onClick={reset}>

                <Link href='/'>
                <X className="size-5"> </X></Link>
            </button>
        </div>
    );
};

export default SearchFormReset;