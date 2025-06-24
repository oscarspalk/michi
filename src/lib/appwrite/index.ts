import { PUBLIC_PROJECT_ID, PUBLIC_PROJECT_URL } from "$env/static/public";
import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(PUBLIC_PROJECT_URL)
  .setProject(PUBLIC_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
