# Super Backend (fixed)

This is a fixed, ready-to-run multivendor backend. It includes:
- Auth (register/login) for users, vendors, admin
- Vendors, Products, Categories, Subcategories, Shops, Orders, Modules
- JWT-based auth and role checks
- Multer image upload stub
- Ready for Render deployment (set PORT env to 10000 on Render)

## Quick start (Termux / local)

1. Move project inside Termux home (important on Android):
   ```
   mv super-backend-fixed ~/super-backend
   cd ~/super-backend
   ```

2. Copy `.env.example` to `.env` and set values:
   ```
   cp .env.example .env
   # edit .env and fill MONGO_URI credentials
   ```

3. Install deps:
   ```
   npm install
   ```

4. Start server:
   ```
   node server.js
   ```

Server will run on the `PORT` in `.env` (default 10000). For local Termux curl tests use `127.0.0.1:10000`.

## Render deployment
- Push to GitHub, create a Web Service in Render.
- Set `PORT=10000` and other env variables on Render.
- Build command: `npm install`
- Start command: `node server.js`

