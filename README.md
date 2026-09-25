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

## Installing it as an app

Since `manifest.json` and `sw.js` are included, Chrome (and most mobile
browsers) will offer a proper **"Install app"** option — not just a
shortcut — once the site is live. On Android/Chrome, open the site, tap
the **⋮** menu, and look for "Install app". It'll then open full-screen
from your home screen, without Chrome's address bar.

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

## Other features

- **People count**: set how many you're cooking for and ingredient
  quantities scale automatically from each recipe's own serving size.
- **Recently picked avoidance**: the app remembers (in your browser's local
  storage, on your device only) which recipes you've generated in the last
  10 days and avoids repeating them, unless your filters are narrow enough
  that it has no choice.
- **Dietary/category filter**: any categories you've tagged in Recipe
  Keeper (e.g. "Vegetarian") appear as filter chips automatically.
- **Manual pick**: the "Or pick a specific recipe yourself" search lets you
  add a named recipe directly instead of relying on the random shuffle.
- **Shopping list checkboxes**: tick items off as you shop; ticked state is
  remembered on your device until you next generate a fresh list.
