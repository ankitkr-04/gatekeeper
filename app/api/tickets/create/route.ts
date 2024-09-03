import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req:NextApiRequest, res: NextApiResponse) {
    try {
        const {booking } = await req.body;
        console.log("booking", booking);

        
        res.status(200).json({success: true, ticketId: "123456"});
    } catch (error) {
       console.error("Error creating ticket");

       res.status(500).json({success: false, error: "Error creating ticket"});
    
    } finally {

    }
    
}