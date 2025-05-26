"use server";
import dbConnect, { allCollection } from "@/lib/dbConnect";


export const insertData =async(data)=>{
    try {

        const collection = dbConnect(allCollection.kormoCollection)
        const result = await collection.insertOne(data)
        return result
        
    } catch (error) {
        console.error("Error inserting data:", error);
        
    }
}