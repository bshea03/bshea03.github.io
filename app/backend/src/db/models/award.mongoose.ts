import { Schema, model } from "mongoose";
import type { Award } from "@types";

const awardSchema = new Schema<Award>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    date: { type: String, required: true },
  },
  { _id: false },
);

const awardListSchema = new Schema(
  { awards: [awardSchema] },
  { timestamps: true },
);

export const AwardListModel = model("AwardList", awardListSchema, "awards");
