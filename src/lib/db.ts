import { Filter, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { getEnv } from "./utils";

let cachedClient: MongoClient | null = null;

export function getMongoUri(): string {
  const explicit = getEnv("MONGO_CONNECTION_URI");
  if (explicit) return explicit;

  // Fallback simple local connection or SRV template can be adjusted as needed
  const username = getEnv("MONGO_DB_USERNAME");
  const password = getEnv("MONGO_DB_PASSWORD");

  return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(
    password
  )}@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=default`;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const uri = getMongoUri();
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  cachedClient = await client.connect();
  return cachedClient;
}

export async function getDb(dbName = "enesdavatiye") {
  const client = await getMongoClient();
  return client.db(dbName);
}

export type AttendenceDocument = {
  _id?: ObjectId;
  name: string;
  email?: string;
  attendance: "biga" | "tokat" | "both" | "none";
  createdAt: Date;
};

export async function insertAttendence(
  doc: Omit<AttendenceDocument, "createdAt" | "_id">
) {
  const db = await getDb();
  const collection = db.collection<AttendenceDocument>("attendence");
  const toInsert: AttendenceDocument = { ...doc, createdAt: new Date() };
  const res = await collection.insertOne(toInsert);
  return { _id: res.insertedId, ...toInsert };
}

export type AttendenceQuery = {
  q?: string;
  page?: number;
  limit?: number;
};

export async function searchAttendence(params: AttendenceQuery) {
  const { q = "", page = 1, limit = 24 } = params || {};

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 24;

  const filter = q
    ? {
        name: {
          $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          $options: "i",
        },
      }
    : {};

  const db = await getDb();
  const collection = db.collection<AttendenceDocument>("attendence");

  const total = await collection.countDocuments(
    filter as Filter<AttendenceDocument>
  );
  const items = await collection
    .find(filter as Filter<AttendenceDocument>, {
      projection: { name: 1, email: 1, attendance: 1, createdAt: 1 },
      sort: { createdAt: -1 },
      skip: (safePage - 1) * safeLimit,
      limit: safeLimit,
    })
    .toArray();

  return { items, total, page: safePage, limit: safeLimit };
}
