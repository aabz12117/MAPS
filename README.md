<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1BkLqO40lVNs9qVs82P6GzIAhvnCg0S6C

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```sh
   npm install
   # (or, if you haven't already) install Tailwind tooling
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Add or replace `favicon.ico` in the project root so the browser stops logging 404 errors.
3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
4. Run the app:
   `npm run dev`

> The project now uses a locally built Tailwind stylesheet instead of the CDN script. The relevant
> configuration lives in `tailwind.config.js` and you should run the `build` script before
> deploying for production so unused CSS is purged.
