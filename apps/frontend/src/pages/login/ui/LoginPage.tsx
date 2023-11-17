import { UserContext } from "@/shared/context/userContext";
import { useContext, useEffect } from "react";

const LoginPage = () => {
  const { rememberMe } = useContext(UserContext);

  useEffect(() => {
    rememberMe();
  }, [rememberMe]);

  return <>Login</>;
};

export default LoginPage;
