# Notes API

## Run
1. `npm install`
2. Set `.env` file with MONGO_URL, JWT_SECRET_KEY, TOKEN_EXP_TIME, PORT
3. `npm start`

## Test Endpoints
- POST /signup `{ email, password }`
- POST /login `{ email, password }` → returns token
- POST /notes `{ title, content }` with `Authorization: Bearer <token>`
- GET /notes with `Authorization: Bearer <token>`
