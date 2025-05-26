import { MongoClient, ServerApiVersion } from 'mongodb'
const uri : string | undefined  =process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version



export default function dbConnect(collectionName: string) {
const client  = new MongoClient(uri , {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

return client.db("nextdb").collection(collectionName)
}

export const allCollection={
  serviceCollection:"services",
  kormoCollection: 'kormo',

}

export const serviceCollection= dbConnect(allCollection.serviceCollection);
export const kormoCollection= dbConnect(allCollection.kormoCollection);