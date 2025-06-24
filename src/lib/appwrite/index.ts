import { PROJECT_ID, PROJECT_URL } from "$env/static/private";
import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(PROJECT_URL)
  .setProject(PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
