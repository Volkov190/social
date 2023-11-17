export enum Routes {
  NEWS = "/",
  USERS = "/users",
  Login = "/login",
  Messages = "/messages"
}

export const pageNames: Record<Routes, string> = {
  [Routes.NEWS]: "Новости",
  [Routes.USERS]: "Пользователи",
  [Routes.Login]: "Аутентификация",
  [Routes.Messages]: "Сообщения",
};
