<script>
  export let sushiRolls = [];

  let selectedProteins = new Set();
  let excludedIngredients = new Set();
  let filtersOpen = false;

  $: filteredRolls = sushiRolls.filter((roll) => {
    const hasSelectedProtein =
      selectedProteins.size === 0 ||
      roll.data.protein.some((p) => selectedProteins.has(p));

    const noAvocado = !excludedIngredients.has("avocado") || !roll.data.hasAvocado;
    const noCheese = !excludedIngredients.has("cheese") || !roll.data.hasCheese;
    const noCreamCheese =
      !excludedIngredients.has("cream_cheese") || !roll.data.hasCreamCheese;
    const noFruit = !excludedIngredients.has("fruit") || !roll.data.hasFruit;

    return hasSelectedProtein && noAvocado && noCheese && noCreamCheese && noFruit;
  });

  function toggleProtein(protein) {
    if (selectedProteins.has(protein)) {
      selectedProteins.delete(protein);
    } else {
      selectedProteins.add(protein);
    }
    selectedProteins = selectedProteins;
  }

  function toggleExclusion(ingredient) {
    if (excludedIngredients.has(ingredient)) {
      excludedIngredients.delete(ingredient);
    } else {
      excludedIngredients.add(ingredient);
    }
    excludedIngredients = excludedIngredients;
  }

  function getAllProteins() {
    const proteins = new Set();
    sushiRolls.forEach((roll) => {
      roll.data.protein.forEach((p) => proteins.add(p));
    });
    return Array.from(proteins).sort();
  }
</script>

<div class="menu">
  <header class="menu-header">
    <h2>Sushi Rolls ({filteredRolls.length})</h2>
    <button
      class="menu-toggle"
      type="button"
      aria-label={filtersOpen ? "Close filters" : "Open filters"}
      aria-expanded={filtersOpen}
      aria-controls="sushi-filters"
      on:click={() => (filtersOpen = !filtersOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <div class="filter-container">
    <div class="filters" class:open={filtersOpen} id="sushi-filters">
    <div class="filter-group">
      <h3>Filter by Protein</h3>
      <div class="checkboxes">
        {#each getAllProteins() as protein}
          <label>
            <input
              type="checkbox"
              checked={selectedProteins.has(protein)}
              on:change={() => toggleProtein(protein)}
            />
            <span>{protein}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="filter-group">
      <h3>Exclude Ingredients</h3>
      <div class="checkboxes">
        <label>
          <input
            type="checkbox"
            checked={excludedIngredients.has("avocado")}
            on:change={() => toggleExclusion("avocado")}
          />
          <span>Avocado</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={excludedIngredients.has("cheese")}
            on:change={() => toggleExclusion("cheese")}
          />
          <span>Cheese</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={excludedIngredients.has("cream_cheese")}
            on:change={() => toggleExclusion("cream_cheese")}
          />
          <span>Cream Cheese</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={excludedIngredients.has("fruit")}
            on:change={() => toggleExclusion("fruit")}
          />
          <span>Fruit</span>
        </label>
      </div>
    </div>
    </div>

    <div class="results">
      <div class="rolls-grid">
        {#each filteredRolls as roll}
          <div class="roll-card">
            <img src={roll.data.imageUri} alt={roll.data.name} />
            <h4>{roll.data.name}</h4>
            <p class="pieces">{roll.data.numberOfPieces} pieces</p>
            <p class="description">{roll.data.description}</p>
            <p class="proteins">
              <strong>Proteins:</strong>
              {#if roll.data.protein.length > 0}
                {roll.data.protein.join(", ")}
              {:else}
                Vegetarian
              {/if}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .menu {
    max-width: 1400px;
    margin: 0 auto;
  }

  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2rem 0;
  }

  .menu-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  .menu-toggle {
    display: none;
  }

  .filter-container {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .filters {
    flex: 0 0 280px;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
    position: sticky;
    top: 1rem;
  }

  .filter-group {
    margin-bottom: 1.5rem;
  }

  .filter-group h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.95rem;
    color: #555;
  }

  label:hover {
    color: #333;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #d32f2f;
    flex-shrink: 0;
  }

  .results {
    flex: 1;
  }

  .results h2 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  .rolls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .roll-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .roll-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .roll-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .roll-card h4 {
    margin: 1rem 1rem 0.5rem 1rem;
    font-size: 1.1rem;
    color: #333;
  }

  .pieces {
    margin: 0.25rem 1rem;
    font-size: 0.9rem;
    color: #999;
  }

  .description {
    margin: 0.75rem 1rem;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
  }

  .proteins {
    margin: 1rem;
    font-size: 0.85rem;
    color: #555;
    border-top: 1px solid #f0f0f0;
    padding-top: 0.75rem;
  }

  @media (max-width: 1024px) {
    .filter-container {
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .filters {
      flex: 0 0 240px;
      padding: 1.25rem;
    }

    .rolls-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .menu-header {
      padding: 1rem 1rem 0;
    }

    .menu-header h2 {
      font-size: 1.25rem;
    }

    .menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 44px;
      height: 44px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 100%;
      height: 2px;
      background: #333;
    }

    .filter-container {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .filters {
      flex: 1;
      position: static;
      display: none;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      height: auto;
    }

    .filters.open {
      display: grid;
    }

    .filter-group {
      margin-bottom: 0;
    }

    .rolls-grid {
      grid-template-columns: 1fr;
    }

    .roll-card img {
      height: 200px;
    }
  }

  @media (max-width: 480px) {
    .menu-header {
      padding: 0.75rem 0.75rem 0;
    }

    .menu-header h2 {
      font-size: 1.1rem;
    }

    .filter-container {
      padding: 0.75rem;
      gap: 0.75rem;
    }

    .filters {
      grid-template-columns: 1fr;
    }

    .filter-group h3 {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }

    label {
      font-size: 0.9rem;
    }

    .roll-card h4 {
      font-size: 1rem;
    }

    .roll-card img {
      height: 180px;
    }

    .description {
      font-size: 0.85rem;
      margin: 0.5rem 0.75rem;
    }

    .proteins {
      margin: 0.75rem;
      font-size: 0.8rem;
    }
  }
</style>
