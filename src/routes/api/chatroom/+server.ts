import { randomUUID } from "node:crypto";
import type { RequestHandler } from "./$types";

import { chatroom } from "$lib/server/chatroom";


export const GET: RequestHandler = async () => {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter(); 

    const address = randomUUID();
    chatroom.join(address, writer);
    writer.write("Welcome to the chatroom\n");

   return new Response(readable); 
} 

export const POST: RequestHandler = async ({ request }) => {
    const message = await request.text();
    chatroom.send(message)
    return new Response("message sent.");
}
