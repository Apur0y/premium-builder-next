

'use client';
import { insertData } from '@/app/action/insert';
import React from 'react';

const page = async() => {

  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    const data = e.target;
    const title = data.title.value;
    const description = data.description.value;
    const category = data.category.value;
    const image = data.image.value;
    const price = data.price.value;
    const projectData = {
      title,
      description,
      category,
      image,
      price
    }
       await insertData(projectData)

  }

  
 
    return (
        <div className=''>
          
      <section className='flex justify-center w-full py-12 bg-gray-50'>
  <form action="" onSubmit={handleSubmit} className='flex flex-col w-full max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-md'>
    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Project Details</h2>
    <p className='text-gray-600 mb-6'>Fill in the details of your project</p>
    
    <div className='space-y-2'>
      <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Name</label>
      <input
        type="text"
        id="title"
        name='title'
        placeholder='Project Title'
        className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200'
      />
    </div>
    
    <div className='space-y-2'>
      <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
      <textarea
        id="description"
        name="description"
       
        placeholder='Project Description'
        className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200'
      ></textarea>
    </div>
    
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-2'>
        <label htmlFor="category" className='block text-sm font-medium text-gray-700'>Category</label>
        <input
          type="text"
          id="category"
          name='category'
          placeholder='Project Category'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200'
        />
      </div>
      
      <div className='space-y-2'>
        <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Price ($)</label>
        <input
          type="number"
          id="price"
          placeholder='Project Price'
          name='price'
          className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200'
        />
      </div>
    </div>
    
    <div className='space-y-2'>
      <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Image URL</label>
      <input
        type="text"
        id="image"
        name='image' 
        placeholder='Project Image URL'
        className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200'
      />
    </div>
    
    <button
      type="submit"
      className='w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    >
      Submit Project
    </button>
  </form>
</section>
        </div>
    );
};

export default page;