import { Model } from "objection";

export class Main extends Model {
  id!: number;
  key!: string | null;
  data!: any;
  created_at!: string;
  updated_at!: string;

  static override get tableName() {
    return "main";
  }

  static override get idColumn() {
    return "id";
  }

  // schema validation
  static override get jsonSchema() {
    return {
      type: "object",
      required: ["data"],
      properties: {
        id: { type: "integer" },
        key: { type: ["string", "null"] },
        data: { type: "object" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  override $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  override $beforeInsert() {
    const tnow = new Date().toISOString();
    if (!this.created_at) this.created_at = tnow;
    if (!this.updated_at) this.updated_at = tnow;
  }
}
