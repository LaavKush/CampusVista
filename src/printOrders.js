import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";

async function migrateOldOrders() {
  const snapshot = await getDocs(collection(db, "printOrders"));
  for (const d of snapshot.docs) {
    const data = d.data();
    if (data.fileNames) {
      const files = data.fileNames.map((name) => ({
        fileName: name,
        fileUrl: "", // optional: fill manually if you have
        copies: data.copies || 1,
        colorOption: data.colorOption || "Coloured",
        orientation: data.orientation || "Portrait",
        layout: data.printLayout === "double" ? "Double Side" : "Single Page",
      }));

      await setDoc(doc(db, "printOrders", d.id), {
        files,
        fileCount: files.length,
        status: data.status || "Success",
      }, { merge: true }); // merge keeps old fields
    }
  }
}

migrateOldOrders().then(() => console.log("✅ Migration complete!"));

