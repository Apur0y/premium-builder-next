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
console.log("params.id:", p.id);
console.log("isValid:", ObjectId.isValid(p.id));
    return (
        <div>
            Here it is {p.id}
      <p>{JSON.stringify(serviceData)}</p>
        </div>
    );
};

export default page;