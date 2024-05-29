# Event Management System

This project is an Event Management System built using Express.js for the backend and a separate frontend. The backend handles user authentication, event creation, and management, and integrates with Google APIs for authentication and event management.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```sh
    cd project-directory
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    CLIENT_ID = <your-client-id>
    CLIENT_SECRET = <your-client-secret>
    REDIRECT_URL = <your-redirect-url>
    MONGO_URI = <your-mongo-uri>
    JWT_SECRET = <your-jwt-secret>
    REFRESH_TOKEN = <your-refresh-token>
    ```

## Running the Application

1. Start the backend server:
    ```sh
    npm run dev
    ```

    The backend server will run on `http://localhost:8000`.

2. Start the frontend:
    ```sh
    npm run dev
    ```

    The frontend will run on `http://localhost:5173`.

## API Endpoints

### User Routes

- **GET /user/**: Get user information.
    ```sh
    GET /user/
    ```

- **GET /user/get-events**: Retrieve all events for a user.
    ```sh
    GET /user/get-events
    ```

- **POST /user/create-event**: Create a new event.
    ```sh
    POST /user/create-event
    ```

- **DELETE /user/delete-event/:googleEventId**: Delete an event by its Google Event ID.
    ```sh
    DELETE /user/delete-event/:googleEventId
    ```

### Google Routes

- **POST /google/create-token**: Create a token for Google authentication.
    ```sh
    POST /google/create-token
    ```

- **POST /google/redirect**: Handle Google OAuth redirection.
    ```sh
    POST /google/redirect
    ```

## Environment Variables

Make sure to replace the placeholder values with your actual configuration values.

- `CLIENT_ID`: Your Google API client ID.
- `CLIENT_SECRET`: Your Google API client secret.
- `REDIRECT_URL`: The redirect URL for Google OAuth.
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `REFRESH_TOKEN`: Google API refresh token.

## Development

- Backend runs on `http://localhost:8000`
- Frontend runs on `http://localhost:5173`

Start both the frontend and backend servers with:
```sh
npm run dev
