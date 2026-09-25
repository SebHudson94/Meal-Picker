# Meal Picker

A small web app that picks a mixture of meals from your Recipe Keeper
collection based on how many you need, the "vibe" you're after (light,
warming, spicy, etc.), and a maximum cooking time — then builds a combined
shopping list with matching ingredients added together.

It reads recipes directly from `recipes.zip` in the browser, so there's
nothing to rebuild or reprocess when you update your recipes.

## Hosting it on GitHub Pages

1. Create a new GitHub repository and upload these two files to the root:
   - `index.html`
   - `recipes.zip`
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
4. GitHub will give you a URL like `https://<username>.github.io/<repo>/`
   within a minute or two. That's your shareable link.

## Updating your recipes

Whenever you add new recipes in Recipe Keeper:

1. In Recipe Keeper, export your full recipe library as HTML (this produces
   a `.zip` file containing `recipes.html` plus an `images` folder).
2. Rename the exported file to exactly `recipes.zip`.
3. In your GitHub repo, upload it to overwrite the existing `recipes.zip`
   (drag-and-drop on the repo's web page works, or `git add` + `git commit`
   + `git push` if you're using the command line).
4. GitHub Pages redeploys automatically — refresh the site in a minute or
   two and the new recipes will be there.

You don't need to touch `index.html` at all — it parses whatever is inside
`recipes.zip` at load time, so this is a straight file swap.

**Note on file size:** your export includes recipe photos, which makes
`recipes.zip` fairly large (tens of MB). GitHub is fine with this, but each
time you re-upload it, that full file size is added to the repository's
history. If the repo grows large after many updates, you can periodically
start a fresh repository, or strip the `images/` folder out of the zip
before uploading if you don't need photos in the app (the app doesn't
currently display them).

## How it works

- `index.html` loads [JSZip](https://stuk.github.io/jszip/) from a CDN,
  fetches `recipes.zip`, and unzips `recipes.html` in-browser.
- It parses the Recipe Keeper HTML export format (schema.org Recipe
  markup) to pull out name, course, category, prep/cook time, servings,
  and ingredients for each recipe.
- "Vibe" tags (Light & fresh, Warming & cosy, Spicy, Comfort food, Hearty &
  meaty, Veggie/plant-based, Everyday) are inferred from keywords in the
  title, course and category — Recipe Keeper doesn't export a vibe field,
  so this is a rough approximation you may want to adjust for your own
  recipe names (edit the `VIBE_KEYWORDS` object near the top of the
  `<script>` in `index.html`).
- The shopping list merges ingredients by name and unit (e.g. two recipes
  each needing "2 tomatoes" become one line reading "4 tomatoes"). It can
  only add quantities together when the unit matches — different units for
  the same ingredient are kept as separate lines.
