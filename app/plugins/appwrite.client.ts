import { Client, Account, Databases, Storage } from "appwrite";

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
          storage: new Storage(client),
        },
      },
    };
  },
});
