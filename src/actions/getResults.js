import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate";

const getElectionsResults = async () => {
  try {
    await dbConnect();
    const elections = await Election.find().populate(
      "candidates",
      "name image slogan color members description votes platform winner"
    );

    const response = elections.reverse();
    return response;
  } catch (error) {
    console.error("Error :: getElectionsResults ::", error);
    return [];
  }
};

export default getElectionsResults;
