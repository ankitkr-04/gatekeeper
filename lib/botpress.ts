// lib/botpressClient.ts
import { Client } from "@botpress/chat";

const myWebhookId = "dae518d0-b501-4b2b-92d1-895b460d25cb";

const client = new Client({
  apiUrl: `https://chat.botpress.cloud/${myWebhookId}`,
});

export default client;
