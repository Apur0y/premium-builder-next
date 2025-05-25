import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://tasks:2qgnZ1P0isEB8jHA@thelaststand.sh6jy.mongodb.net/?retryWrites=true&w=majority&appName=thelaststand";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default function dbConnect(collectionName: string) {
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

return client.db("nextdb").collection(collectionName)
}