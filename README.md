# Sushi Menu Filter

A Filterable Sushi Menu for Sushi Iwa in Clayton, NC

Live Link: https://geraldiner.github.io/sushi-menu-filter/

This website came about through my experience at Sushi Iwa, trying to go through their entire catalog of sushi dishes to find those without cream cheese and those without avocado for my husband.

Users can browse the full menu and filter dishes based on properties such as protein, avocado, cream cheese, and fruit (yes, fruit in sushi!).

Disclaimer: All content is owned by Sushi Iwa. I am not claiming any rights to the content, text, or images.

## How It’s Made

### Astro & Astro Content Collections

The menu contains fewer than 100 dishes and changes infrequently, so I chose a statically generated architecture, rather than introducing a database or backend service.

I reached for Astro since it’s something I’ve worked with recently, and I know I can use its Content Collections to define and validate menu data with a schema. The catalog is included in the generated site, allowing filtering to happen locally in the browser without a network request for each filter change.

### Data model

Each sushi dish is defined with:

- name
- number of pieces
- description
- image URL
- ingredients
- proteins
- has avocado
- has cream cheese
- has fruit

In Astro, this is defined as follows:

```tsx
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
```

And with Content Collections, I can define all the sushi dishes in a single JSON file:

```json
// sushi_rolls.json
[
  {
    "id": "a_pizza",
    "name": "A's Pizza",
    "numberOfPieces": 8,
    "description": "Crispy spring roll skin filled with pepper jack cheese and crab stick, topped with smoked salmon and sweet chile sc.",
    "imageUri": "https://www.sushiiwa.org/assets/img/sushi/apizza.jpg",
    "protein": ["crab stick", "salmon"],
    "hasAvocado": false,
    "hasCheese": true,
    "hasCreamCheese": false,
    "hasFruit": false
  },
  {
    "id": "albacore_love",
    "name": "Albacore Love",
    "numberOfPieces": 8,
    "description": "Crispy onion Tempura, Spicy Mayonnaise and Tempura flakes, topped with seared albacore, green onion and Sweet Soy Citrus.",
    "imageUri": "https://www.sushiiwa.org/assets/img/sushi/AlbacoreLove.jpg",
    "protein": ["tuna"],
    "hasAvocado": false,
    "hasCheese": false,
    "hasCreamCheese": false,
    "hasFruit": false
  },
  ...
  ]
```

### Svelte

The dynamic part of the site is built with Svelte to handle the filtering. The full catalog is available to the client, so filters can be applied to the local data and the UI updated without additional requests.

### GitHub Pages (and GitHub Actions)

I chose GitHub Pages because this is a static site and I just needed a simple place to host it. Since the project is already in GitHub, GitHub Pages also makes deployment straightforward, and I can use a GitHub Action to automatically deploy changes pushed to the `main` branch.

## Using Copilot

This was my first foray into using agents to write out an application. This project is pretty small and not too complex, so it did well. But I will say, it didn’t feel good to hand off the Svelte portion to Copilot when I’m not very familiar with it myself yet. I wish I’d done it myself, at least while Svelte is still so new to me.

This was my first foray into using agents to write an application. The project is relatively small and straightforward, so Copilot did well with the implementation. However, it didn’t feel great to hand off the Svelte portion when Svelte is still new to me. In hindsight, I would have preferred to implement that part myself so I could use the project as an opportunity to learn the framework.

## 🚀 Other Projects

Check out other stuff I've worked on:

**Sushi Menu Filter**: https://github.com/geraldiner/sushi-menu-filter

**Reuben Sandwiches**: https://github.com/geraldiner/reuben-sandwiches

**Animal Crossing API**: https://github.com/geraldiner/ac-api

## 🤙 Let's connect

- Website: [geraldiner.com](https://geraldiner.com)
- Resume: [Geraldine R](https://geraldiner.com/GeraldineRagsac_Resume.pdf)
- LinkedIn: [in/geraldiner](https://linkedin.com/in/geraldiner)
- Sometimes I write: [@geraldiner](https://geraldiner.hashnode.dev)
- For crochet work: [@geraldinedesu](https://instagram.com/geraldinedesu)
