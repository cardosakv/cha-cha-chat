import { KEY_USERNAME } from "~/shared/constants";

export default defineNuxtRouteMiddleware((to, from) => {
  const username = useCookie(KEY_USERNAME);

  if (!username.value && to.path !== "/") {
    return navigateTo("/");
  }

  if (username.value && to.path !== "/chat") {
    return navigateTo("/chat");
  }
});
