import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import React from 'react';

interface Params {
  id: string;
}
const page = async({ params }: { params: Params }) => {

   const p =await params;
   
     const serviceCollection =await dbConnect("services");
     const serviceData = await serviceCollection.findOne({_id :new ObjectId(p.id)});

    return (
        <div>
            
      <section className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
  {/* Hero Image with Gradient Overlay */}
  <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 group">
    <img 
      src={serviceData?.img} 
      alt={serviceData?.title} 
      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-8 left-8 text-white">
      <span className="bg-indigo-600 text-sm px-3 py-1 rounded-full font-medium">
        {serviceData?.category || "Premium Service"}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold mt-3 drop-shadow-lg">
        {serviceData?.title}
      </h1>
      <p className="text-2xl font-semibold mt-2 text-indigo-300">
        ${serviceData?.price} <span className="text-base text-gray-300">/ session</span>
      </p>
    </div>
  </div>

  {/* Content Section */}
  <div className="grid md:grid-cols-3 gap-8">
    {/* Main Description */}
    <div className="md:col-span-2">
      <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2">
          Service Details
        </h2>
        <p className="text-lg leading-relaxed">
          {serviceData?.description}
        </p>
      </div>
    </div>

    {/* Sidebar Card */}
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
          Quick Summary
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600 dark:text-gray-300">Duration: 60 mins</span>
          </li>
          {/* Add more features as needed */}
        </ul>
        <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
          Book Now
        </button>
      </div>

      {/* Testimonial (example) */}
      <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-xl">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-indigo-600 dark:text-indigo-300 font-bold">JD</span>
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-gray-800 dark:text-white">John Doe</h4>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_l, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic">
          This service completely transformed my business! Highly recommend.
        </p>
      </div>
    </div>
  </div>
</section>
        </div>
    );
};

export default page;