import dbConnect from '@/lib/dbConnect';
import React from 'react';

const page = async() => {

  const dataType = dbConnect("items");
  const data =await dataType.find({}).toArray()
  console.log(data);
    return (
        <div className='pt-24'>
          {
            data.map((item: any) => (
              <div key={item._id} className="card  shadow-xl m-4">
                    {item?.userName}
              </div>
            ))
          }
          <div className="hero bg-base-200 min-h-screen text-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
        
    <div className="card bg-pink-900 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default page;