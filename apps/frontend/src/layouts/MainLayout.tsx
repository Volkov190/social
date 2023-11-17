import Modal from "@/shared/components/Modal/ui/Modal";
import { UserContext } from "@/shared/context/userContext";
import { useCallback, useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Routes, pageNames } from "../app/lib/routes";

const MainLayout = () => {
  const { user, logout } = useContext(UserContext);
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

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="h-16 flex items-center px-8 bg-secondary justify-between">
        <h1 className="text-2xl">Social</h1>
        {user ? (
          <div className="flex gap-2 items-center">
            {user.name}
            <button
              onClick={logout}
              className="bg-accent p-1 rounded-lg text-background"
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
              <div className="flex flex-col gap-4">
                <button
                  className="bg-secondary rounded-lg p-2 shadow-md hover:bg-teal-300 hover:transition-colors duration-700 hover:shadow-lg hover:transition-shadow"
                  onClick={handleClickGoogleLogin}
                >
                  Google
                </button>
                <button
                  className="bg-secondary rounded-lg p-2 shadow-md hover:bg-teal-300 hover:transition-colors duration-700 hover:shadow-lg hover:transition-shadow"
                  onClick={handleClickGithubLogin}
                >
                  Github
                </button>
              </div>
            </Modal>
            <button
              onClick={handleClickLogin}
              className="bg-accent p-1 rounded-lg text-background"
            >
              Войти
            </button>
          </>
        )}
      </div>
      <div className="bg-background grow flex gap-8">
        <nav className="w-1/5 bg-primary flex flex-col justify-between">
          <div className="flex flex-col p-8 gap-2">
            {Object.keys(pageNames).map((href) => (
              <NavLink
                to={href}
                className="bg-secondary rounded-lg p-2 shadow-md cursor-pointer"
              >
                {pageNames[href as Routes]}
              </NavLink>
            ))}
          </div>
          <div className="p-8">
            <button
              className="bg-secondary p-2 rounded-lg"
              onClick={() => {
                const test = document.documentElement;
                test.classList.toggle("dark");
              }}
            >
              тема
            </button>
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
