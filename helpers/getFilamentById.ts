import PouchDB from "pouchdb";

async function getFilamentById(
  db: PouchDB.Database,
  id: string
): Promise<any | null> {
  if (!db) {
    console.error("Database is not initialized.");
    return null;
  }

  try {
    const doc = await db.get(id);
    return doc;
  } catch (error: unknown) {
    console.error(`Error getting filament with ID ${id}:`, error);

    if (error instanceof Error) {
      if (error.name === "NotFoundError") {
        return null; // Document not found, return null
      } else {
        throw new Error(error.message);
      }
    } else if (typeof error === "string") {
      throw new Error(error);
    } else {
      throw new Error(
        "An unknown error occurred while retrieving the filament."
      );
    }
  }
}

export default getFilamentById;
