type Client = {
  controller: ReadableStreamDefaultController;
};

class Chatroom {
  private clients: Map<string, Client> = new Map();

  constructor() { }

  join = (address: string, controller: ReadableStreamDefaultController) => {
    this.clients.set(address, { controller });
    controller.enqueue("Welcome to the chatroom!");
    return new Promise((res) => {
      const client = this.clients.get(address);
      if (!client) {
        res("client disconnected");
      }
    }) 
  };

  send = (message: string) => {
    for (const [address, client] of Array.from(this.clients)) {
      try {
        client.controller.enqueue(`${message}\n`);
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
