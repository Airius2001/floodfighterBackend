# FloodFighter Backend
This is the backend API service for the FloodFighter project. It handles data persistence, business logic, quiz / flood-info APIs, and serves as the core data provider for the frontend client.

Front end repo:
https://github.com/Airius2001/floodfighter.git

Public data / dataset repo:
https://github.com/TrNgyn/FloodFighter_public_data.git

## Project Structure
```
floodfighterBackend/
│
├── .vercel/                     # Vercel deployment configuration
├── api/                         # (Optional) API route definitions for serverless deployment
├── dist/                        # Compiled TypeScript output
├── node_modules/                # Dependencies
├── src/                         # Main application source code
│   ├── quiz/                    # Quiz module
│   │   ├── entities/            # TypeORM entities defining database models
│   │   │   ├── quiz-explanation.entity.ts
│   │   │   ├── quiz-option.entity.ts
│   │   │   ├── quiz-question.entity.ts
│   │   ├── quiz.controller.ts   # Handles quiz-related HTTP requests
│   │   ├── quiz.service.ts      # Business logic for quiz data
│   │
│   ├── app.controller.ts        # Main application controller
│   ├── app.controller.spec.ts   # Unit tests for AppController
│   ├── app.module.ts            # Root module of the application
│   ├── app.service.ts           # Core service providing shared functionality
│
│   ├── flood.controller.ts      # Controller for flood data endpoints
│   ├── flood.service.ts         # Service handling flood-related logic
│
│   ├── geo.controller.ts        # Controller for geographical data
│   ├── geo.service.ts           # Service managing geographic data retrieval
│
│   ├── rainfall.controller.ts   # Controller for rainfall data
│   ├── rainfall.service.ts      # Service managing rainfall analysis
│
│   ├── water-data.service.ts    # Service for handling water-level datasets
│
│   ├── weather.controller.ts    # Controller for weather API requests
│   ├── weather.service.ts       # Service providing weather data logic
│
│   ├── main.ts                  # Application entry point (bootstraps NestJS app)
│
├── test/                        # Unit/integration tests
│
└── package.json                 # Project metadata and scripts
```

## Key Features & Responsibilities
This backend handles:
  * Quiz APIs — endpoints for fetching quiz questions, submitting answers, scoring
  * Flood Data Endpoints — provide flood data, geospatial queries

## Tech stack
```
Layer	                                 Technology / Library
Framework	                             NestJS (TypeScript)
ORM / Database	                         TypeORM + PostgreSQL
Environment                              @nestjs
Testing                                  Postman
Deployment                               Render
Scripting                                Node.js script
```

## Setup & Local Development
1. Clone & Install

```
git clone https://github.com/Airius2001/floodfighterBackend.git
cd floodfighterBackend
npm install
# or
yarn install
```

2. Configure Environment Variables

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=floodfighter
```

3. Start the Server

```
npm run start:dev
# or
yarn start:dev
```
By default, the app should run on http://localhost:3001 (or whatever port you configure).

## Testing
```
npm run test
# or
yarn test
```

## Deployment (Render)
Go to render platform and then connect your github account, then select the backend repository. Finally click manual deploy button and select the main branch to deploy.

## Integration with Frontend
  * The frontend’s API URLS should point to this backend’s deployed URL.
  * Ensure CORS is configured to allow your frontend origin.

## Public Data & Datasets
The backend depends on the public data repository:

  * https://github.com/TrNgyn/FloodFighter_public_data.git (Contains CSV / SQL scripts, initial quiz data, and flood datasets.)
  * Use this data to seed your database or feed endpoints.

## Acknowledgments
  * The frontend team and contributors
  * FloodFighter public data contributors
  * Open-source frameworks: NestJS, TypeScript, PostgreSQL, etc.



