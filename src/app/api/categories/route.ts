import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../lib/firebase/config.mjs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = [];
    const querySnapshot = await getDocs(collection(db, "categories"));

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const imageRef = ref(storage, `categoriesImg/${doc.id}.png`);
      const imageUrl = await getDownloadURL(imageRef);

      // Получаем подкатегории для текущей категории
      const subcategoriesQuery = query(
        collection(db, "subcategories"),
        where("categoryID", "==", doc.id)
      );
      const subcategoriesSnapshot = await getDocs(subcategoriesQuery);
      const subcategories = subcategoriesSnapshot.docs.map((subDoc) =>
        subDoc.data()
      );

      categories.push({ id: doc.id, ...data, image: imageUrl, subcategories });
    }

    return NextResponse.json(
      { categories },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
