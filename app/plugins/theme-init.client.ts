import { useTheme } from "vuetify";

export default defineNuxtPlugin(() => {
  const theme = useTheme();
  const themeStored = useLocalStorage(
    useAppConfig().theme.THEME_ACTIVE,
    () => "",
  );
  watch(
    () => theme.global.name.value,
    (theme) => {
      themeStored.value = theme;
    },
  );
  onNuxtReady(() => {
    callOnce(() => {
      theme.global.name.value = themeStored.value;
    });
  });
});
