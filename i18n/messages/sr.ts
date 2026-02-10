import app from "../locales/sr.json";
import { srLatn } from "vuetify/locale";

export default {
  ...app,
  // vuetify expects this namespace:
  $vuetify: srLatn,
};
