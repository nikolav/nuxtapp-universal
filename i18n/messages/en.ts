import app from "../locales/en.json";
import { en } from "vuetify/locale";

export default {
  ...app,
  // vuetify expects this namespace:
  $vuetify: en,
};
