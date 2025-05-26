"use server";
import dbConnect, { allCollection } from "@/lib/dbConnect";
import toast from "react-hot-toast";
// import bcrypt from "bcrypt";


export const insertData = async (data: any) => {

    try {

        // const {password}=data;
        // const hashedPassword = await bcrypt.hash(password, 10);
        // data.password = hashedPassword;
        const collection = dbConnect(allCollection.kormoCollection)
        
        const result = await collection.insertOne(data);
        const {acknowledged, insertedId} = result;
       
        return {acknowledged, insertedId: insertedId.toString()};
        
    } catch (error) {
        console.error("Error inserting data:", error);
        
    }
}