import PouchDB from "pouchdb";
import Joi from "joi";

export async function initializeFilamentDB() {
  try {
    if (typeof window !== "undefined") {
      const db = new PouchDB("filament");

      // const dbInfo = await db.info(); //For debugging
      // console.log("Database Info:", dbInfo);

      // Create indexes (very important for performance)
      // await db.createIndex({
      //   index: { fields: ["filament"] },
      //   name: "filament-index",
      // });

      return db;
    } else {
      console.warn(
        "Database initialization should only happen on the client-side."
      );
      return null;
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    return null;
  }
}

// Schema for data validation using Joi
export const filamentSchema = Joi.object({
  _id: Joi.string().allow(""),
  _rev: Joi.string().allow(""),
  filament: Joi.string().required(),
  material: Joi.string().required(),
  used_weight: Joi.number().min(0).empty("").default(0),
  total_weight: Joi.number().min(0).empty("").default(1000),
  location: Joi.string().empty("").default(""),
  comments: Joi.string().allow(""),
});
