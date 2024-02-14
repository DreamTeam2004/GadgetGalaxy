import { auth } from "@/DB/firebase/firebase";
import { setUser } from "@/lib/store/slices/UserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      // Если пользователь аутентифицирован, формируем объект с данными пользователя
      const user = authUser
        ? {
            uid: authUser.uid,
            email: authUser.email,
            name: authUser.displayName,
            photo: authUser.photoURL,
            accessToken: await authUser.getIdToken(true),
            provider: authUser.providerData[0]?.providerId,
          }
        : null;

      // Отправляем действие в Redux для обновления состояния пользователя
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; // или другие данные, которые вы хотите вернуть
};

export default useAuth;
