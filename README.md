# QA Forum (Anonymous)

https://github.com/user-attachments/assets/c1b72eac-6a8d-40ba-a6c7-861438c0484b

> QA Forum is an anonymous question-answer platform where users can post questions, provide answers, and upvote or downvote questions. The app ensures user anonymity through browser fingerprinting, which uniquely identifies users without the need for personal information.

## Features

- **Anonymous Questions and Answers**: Users can anonymously post questions and respond with answers.
- **Upvote/Downvote Mechanism**: Vote on questions to highlight useful content.
- **User Identification via Browser Fingerprinting**: No personal data is required; users are identified solely by a unique fingerprint.
- **Automated Audit Logging**: User actions are logged using PostgreSQL functions and triggers.

## Tech Stack

- **Backend**: PostgreSQL, Python, FastAPI, GraphQL
- **Frontend**: React, Relay, TypeScript
- **Containerization**: Docker Compose for managing PostgreSQL

## Database Schema

```sql
-- Table for audit logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR NOT NULL,
    operation VARCHAR NOT NULL,
    row_id INTEGER NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fingerprint TEXT NOT NULL,
    username VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title CITEXT NOT NULL,  -- CITEXT doesn't require a length limit
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Answers table
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

-- Enum type for vote type
CREATE TYPE vote_type AS ENUM ('UPVOTE', 'DOWNVOTE');

-- Question votes table
CREATE TABLE question_votes (
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    vote_type vote_type NOT NULL,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

-- Audit log function and trigger for questions
CREATE OR REPLACE FUNCTION log_question_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
        VALUES ('questions', 'INSERT', NEW.id, row_to_json(NEW), NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
        VALUES ('questions', 'UPDATE', OLD.id, row_to_json(OLD), row_to_json(NEW), NOW());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
        VALUES ('questions', 'DELETE', OLD.id, row_to_json(OLD), NOW());
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER question_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON questions
FOR EACH ROW
EXECUTE FUNCTION log_question_changes();

-- Audit log function and trigger for question_votes
CREATE OR REPLACE FUNCTION log_question_vote_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
        VALUES ('question_votes', 'INSERT', NEW.question_id, row_to_json(NEW), NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
        VALUES ('question_votes', 'UPDATE', OLD.question_id, row_to_json(OLD), row_to_json(NEW), NOW());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
        VALUES ('question_votes', 'DELETE', OLD.question_id, row_to_json(OLD), NOW());
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER question_vote_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON question_votes
FOR EACH ROW
EXECUTE FUNCTION log_question_vote_changes();

-- Audit log function and trigger for answers
CREATE OR REPLACE FUNCTION log_answer_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
        VALUES ('answers', 'INSERT', NEW.id, row_to_json(NEW), NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
        VALUES ('answers', 'UPDATE', OLD.id, row_to_json(OLD), row_to_json(NEW), NOW());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
        VALUES ('answers', 'DELETE', OLD.id, row_to_json(OLD), NOW());
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER answer_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON answers
FOR EACH ROW
EXECUTE FUNCTION log_answer_changes();
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

You can visit the site at https://localhost when deploying with Docker Compose

## Contributing

Contributions are welcome! Please submit a pull request or file an issue if you encounter bugs or have feature suggestions.

## License

See the project license [here](./LICENSE.md)
