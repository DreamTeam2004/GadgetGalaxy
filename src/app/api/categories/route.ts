import { NextResponse } from "next/server";
import { admin } from "../(firebase)/firebase-admin";

export async function GET() {
  try {
    const categories = [];
    const querySnapshot = await admin
      .firestore()
      .collection("categories")
      .get();

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      // Получаем подкатегории для текущей категории
      const subcategoriesQuery = admin
        .firestore()
        .collection("subcategories")
        .where("categoryID", "==", doc.id);
      const subcategoriesSnapshot = await subcategoriesQuery.get();
      const subcategories = subcategoriesSnapshot.docs.map((subDoc) => {
        const subData = subDoc.data();
        return { id: subDoc.id, ...subData };
      });

      categories.push({ id: doc.id, ...data, subcategories });
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
