import { randomUUID } from "node:crypto";
import type { RequestHandler } from "./$types";

import { chatroom } from "$lib/server/chatroom";

export const GET: RequestHandler = async ({ setHeaders }) => {
    const address = randomUUID();

    const stream = new ReadableStream({
        async start(controller) {
            await chatroom.join(address, controller);
            controller.close();
        }
    });

    setHeaders({
        "content-type": "text/plain",
        connection: "keep-alive"
    })

   return new Response(stream); 
} 

export const POST: RequestHandler = async ({ request }) => {
    const message = await request.text();
    chatroom.send(message)
    return new Response("message sent.");
}
