import Modal from "@/shared/components/Modal/ui/Modal";
import { UserContext } from "@/shared/context/userContext";
import { useCallback, useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Routes, pageNames } from "../app/lib/routes";

const MainLayout = () => {
  const { user, logout, rememberMe } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleClickLogin = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleClickGoogleLogin = useCallback(() => {
    fetch("http://localhost:3003/auth", {
      method: "post",
    })
      .then((response) => response.text())
      .then((res) => {
        window.location.href = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClickGithubLogin = useCallback(async () => {
    window.open("http://localhost:3003/auth/github");
  }, []);

  const handleTestAuthClick = useCallback(async () => {
    await fetch("http://localhost:3003/auth/test-auth", {
      method: "POST",
      credentials: "include",
    });
    rememberMe();
  }, [rememberMe]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="h-16 flex items-center px-8 bg-teal-200 justify-between">
        <h1 className="text-2xl">Social</h1>
        {user ? (
          <div>
            {user.name}
            <button
              onClick={logout}
              className="bg-teal-500 p-1 rounded-lg text-white"
            >
              Выйти
            </button>
          </div>
        ) : (
          <>
            <Modal
              open={isLoginModalOpen}
              title="Войти с помощью"
              className="flex flex-col"
              onClose={() => {
                setIsLoginModalOpen(false);
              }}
            >
              <button onClick={handleClickGoogleLogin}>Google</button>
              <button onClick={handleClickGithubLogin}>Github</button>
              <button onClick={handleTestAuthClick}>Test auth</button>
            </Modal>
            <button
              onClick={handleClickLogin}
              className="bg-teal-500 p-1 rounded-lg text-white"
            >
              Войти
            </button>
          </>
        )}
      </div>
      <div className="bg-teal-50 grow flex gap-8">
        <nav className="bg-teal-100 w-1/5">
          <div className="flex flex-col p-8 gap-2">
            {Object.keys(pageNames).map((href) => (
              <NavLink
                to={href}
                className="bg-teal-200 rounded-lg p-2 shadow-md cursor-pointer"
              >
                {pageNames[href as Routes]}
              </NavLink>
            ))}
          </div>
        </nav>
        <main className="grow p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
