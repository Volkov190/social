import { UserContext, UserContextValues } from "@/shared/context/userContext";
import { FC, PropsWithChildren, useCallback, useState } from "react";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserContextValues["user"]>(null);

  const rememberMe = useCallback(async () => {
    const user = await (
      await fetch("http://localhost:3003/auth/remember-me", {
        credentials: "include",
      })
    ).json();

    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await fetch("http://localhost:3003/auth/logout", {
      method: "post",
      credentials: "include",
    });
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, rememberMe, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
