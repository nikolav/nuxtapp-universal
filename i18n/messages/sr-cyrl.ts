import app from "../locales/sr-cyrl.json";
import { srCyrl } from "vuetify/locale";

export default {
  ...app,
  // vuetify expects this namespace:
  $vuetify: srCyrl,
};
