# odin-blog-api

This is a project submission for The Odin Project NodeJS Course, Project: Blog API.

This is a restful API using Express framework that provides endpoints clients can consume.

Links:

- Main Client: [Live](https://odin-blog-rho.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog)
- Admin Client: [Live](https://odin-blog-admin-eta.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog-admin)
- API: [Live](https://odin-blog-api-hwjb.onrender.com/api/) | [Repo](https://github.com/michael1-0/odin-blog-api)

## Features

- RESTful API for blog management
- User authentication with JWT
- CRUD operations for blog posts
- CRUD operations for comments
- Protected routes for admin actions
- Input validation and error handling
- PostgreSQL database with Prisma ORM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Passport.js with JWT strategy
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

## Installation

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Set up environment variables by copying `.env.example`:

```bash
cp .env.example .env
```

4. Prisma setup

```bash
npx prisma db push
npx prisma generate
```

5. Start the development server

```bash
npm run dev
```

## API Routes

### Authentication

- `POST /api/sign-up` - Register a new user
- `POST /api/log-in` - Login and receive JWT token

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

### Comments

- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get a single comment
- `POST /api/comments` - Create a new comment
- `PUT /api/comments/:id` - Update a comment (requires authentication)
- `DELETE /api/comments/:id` - Delete a comment (requires authentication)
