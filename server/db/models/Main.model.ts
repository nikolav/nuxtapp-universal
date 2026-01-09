import { Model } from "objection";

export interface MainData {
  [key: string]: any;
}

export class Main extends Model {
  id!: string;
  key!: string | null;
  data!: MainData;
  created_at!: string;
  updated_at!: string;

  static override get tableName() {
    return "main";
  }

  static override get idColumn() {
    return "id";
  }

  // JSON schema validation (runtime safety)
  static override get jsonSchema() {
    return {
      type: "object",
      required: ["data"],

      properties: {
        id: { type: "string", format: "uuid" },
        key: { type: ["string", "null"], minLength: 1 },
        data: { type: "object" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  // App-level UTC timestamp update
  override $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
