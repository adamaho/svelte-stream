type Client = {
  conn: WritableStreamDefaultWriter;
  last_message: Date | null;
};

class Chatroom {
  private clients: Map<string, Client> = new Map();

  constructor() { }

  join = (address: string, conn: WritableStreamDefaultWriter) => {
    this.clients.set(address, { conn, last_message: null });
  };

  send = async (message: string) => {
    for (const [address, client] of Array.from(this.clients)) {
      try {
        await client.conn.write(`${message}\n`);
      } catch (error) {
        console.log(`client ${address} disconnected`);
        this.leave(address);
      }
    }
  };

  private leave = (address: string) => {
    this.clients.delete(address);
  };
}

export const chatroom = new Chatroom();
