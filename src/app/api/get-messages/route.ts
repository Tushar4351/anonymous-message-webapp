import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  //console.log("user information", _user);

  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user._id);
  //console.log("user ID", userId);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } }, // Use preserveNullAndEmptyArrays to keep users without messages
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    if (!user || user.length === 0) {
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404 }
      );
    }

    // If the user has no messages, return an empty array instead of an error
    const messages = user[0].messages.filter(Boolean);

    return new Response(JSON.stringify({ messages: messages, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", success: false }),
      { status: 500 }
    );
  }
}
