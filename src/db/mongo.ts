import { Db, MongoClient } from 'mongodb';

export class MongoPlug {
  private client!: MongoClient;
  private db!: Db;

  async init(uri: string) {
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db();
  }

  getConnection(): Db {
    return this.db;
  }
}

const mongoPlug = new MongoPlug();

// Exports unique instance
export default mongoPlug;
