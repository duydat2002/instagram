import { getDoc, runTransaction } from "firebase/firestore";
import { db } from "@/firebase/init";
import { get as lodashGet } from "lodash";

export async function updateWithTransaction(docRef, fieldName, calFunction) {
  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(docRef);
      if (doc.exists()) {
        const oldValue = lodashGet(doc.data(), fieldName);
        const newValue = calFunction(oldValue);

        transaction.update(docRef, {
          [fieldName]: newValue,
        });

        return newValue;
      }
    });

    const updatedDoc = await getDoc(docRef);

    const updatedUser = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
