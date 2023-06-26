import { Server } from 'http';
import app from './app';
import mongoPlug from './db/mongo';

class ApiServer {
  server!: Server;

  async start() {
    const PORT = process.env.PORT || 3000;
    await this.initializeDependencies();
    this.server = app.listen(PORT, async () => {
      console.log(`Starting on mode ${process.env.NODE_ENV}`);
      console.log(`Listening on ${PORT}`);
    });
  }

  async initializeDependencies() {
    const uri = process.env.MONGODB_URI as string;
    await mongoPlug.init(uri);
  }
}

const server = new ApiServer();
server.start();
