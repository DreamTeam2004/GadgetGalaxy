import * as admin from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";

import { config } from "dotenv";
config();

const adminConfig = {
    credential: admin.credential.cert({
      projectId: process.env.NEXT_ADMIN_FIREBASE_PROJECT_ID,
      privateKey: process.env.NEXT_ADMIN_FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.NEXT_ADMIN_FIREBASE_CLIENT_EMAIL,
    }),
  };
  
  // Проверка, чтобы избежать повторной инициализации
  if (!getApps().length) {
    initializeApp(adminConfig);
  }
  
  export { admin };
