import {
  Client,
  Account,
  Databases,
  TablesDB,
  Storage,
  Realtime,
} from "appwrite";

export default defineNuxtPlugin({
  name: "appwrite",
  setup: () => {
    const appwrite = useRuntimeConfig().public.appwrite;
    const client = new Client()
      .setEndpoint(appwrite.endpoint)
      .setProject(appwrite.project);
    return {
      provide: {
        appwrite: {
          client,
          account: new Account(client),
          db: new Databases(client),
          tables: new TablesDB(client),
          storage: new Storage(client),
          realtime: new Realtime(client),
        },
      },
    };
  },
});
