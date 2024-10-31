# QA Forum

QA Forum is an anonymous question-answer platform where users can post questions, provide answers, and upvote or downvote questions. The app ensures user anonymity through browser fingerprinting, which uniquely identifies users without the need for personal information.

## Features

- **Anonymous Questions and Answers**: Users can anonymously post questions and respond with answers.
- **Upvote/Downvote Mechanism**: Vote on questions to highlight useful content.
- **User Identification via Browser Fingerprinting**: No personal data is required; users are identified solely by a unique fingerprint.

## Tech Stack

- **Backend**: PostgreSQL, Python, FastAPI, GraphQL
- **Frontend**: React, Relay, TypeScript
- **Containerization**: Docker Compose for managing PostgreSQL

## Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fingerprint TEXT NOT NULL,
    username VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title CITEXT(150) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

CREATE TYPE vote_type AS ENUM ('UPVOTE', 'DOWNVOTE');

CREATE TABLE question_votes (
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    vote_type vote_type NOT NULL,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- PDM for Python package management
- Node.js and PNPM (for the React frontend)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aryaniyaps/qa-forum
   ```

2. **Set up PostgreSQL with Docker Compose**:

   ```bash
   docker-compose up -d
   ```

   This will start a PostgreSQL container configured for the project.

3. **Install backend dependencies and start the server**:

   - Navigate to the server directory:

     ```bash
     cd server
     ```

   - Create an `.env` file following the reference template `./.env.example`.

   - Install dependencies:
     ```bash
     pdm install
     ```
   - Generate the GraphQL schema:
     ```bash
     pdm run generate-graphql-schema
     ```
   - Start the backend server:
     ```bash
     pdm run dev
     ```

4. **Install frontend dependencies and start the client**:

   - Navigate to the client directory:

     ```bash
     cd client
     ```

   - Create an `.env` file following the reference template `./.env.example`.

   - Install dependencies:
     ```bash
     pnpm install
     ```
   - Run the Vite development server:
     ```bash
     pnpm run dev
     ```
   - Run the Relay compiler:
     ```bash
     pnpm run relay
     ```

### Development Workflow

- **Starting the Backend**: Use `pdm dev` to start the FastAPI server.
- **Generating GraphQL Schema**: Run `pdm run generate-graphql-schema` to update the schema in the backend.
- **Starting the Frontend**: Use `pnpm run dev` in the `client` directory to start the Vite development server, and `pnpm run relay` to run the Relay compiler.

## Usage

Once the servers are running, open your browser to the frontend's URL to access the QA Forum. Users can ask questions and submit answers, and vote on questions anonymously.

## Contributing

Contributions are welcome! Please submit a pull request or file an issue if you encounter bugs or have feature suggestions.

## License

See the project license [here](./LICENSE.md)
