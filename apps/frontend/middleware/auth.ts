import { KEY_USERNAME } from "~/shared/constants";

export default defineNuxtRouteMiddleware((to, from) => {
  const username = useCookie(KEY_USERNAME).value;

  if (!username && to.path !== "/") {
    return navigateTo("/");
  }

  if (username && to.path !== "/chat") {
    return navigateTo("/chat");
  }
});
