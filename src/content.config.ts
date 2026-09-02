import { file } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const sushiRolls = defineCollection({
  loader: file("src/data/sushi_rolls.json"),
  schema: z.object({
    name: z.string(),
    numberOfPieces: z.number(),
    description: z.string(),
    imageUri: z.string(),
    protein: z.array(z.string()),
    hasAvocado: z.boolean().optional(),
    hasCheese: z.boolean().optional(),
    hasCreamCheese: z.boolean().optional(),
    hasFruit: z.boolean().optional(),
  }),
});

export const collections = { sushiRolls };
