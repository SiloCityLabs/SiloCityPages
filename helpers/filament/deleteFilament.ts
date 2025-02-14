import PouchDB from "pouchdb";

async function deleteFilament(
  db: PouchDB.Database,
  id: string
): Promise<boolean> {
  if (!db) {
    console.error("Database is not initialized.");
    return false;
  }

  try {
    const doc = await db.get(id);
    if (!doc) {
      console.error(`Filament with ID ${id} not found for deletion.`);
      return false;
    }
    const response = await db.remove(doc); // Delete the document
    return true;
  } catch (error: unknown) {
    console.error(`Error deleting filament with ID ${id}:`, error);

    if (error instanceof Error) {
      if (error.name === "NotFoundError") {
        console.error(`Filament with ID ${id} not found for deletion.`);
        return false;
      } else {
        throw new Error(error.message);
      }
    } else if (typeof error === "string") {
      throw new Error(error);
    } else {
      throw new Error("An unknown error occurred while deleting the filament.");
    }
  }
}

export default deleteFilament;
