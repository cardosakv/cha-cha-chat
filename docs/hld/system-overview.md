# System Overview

Cha-Cha-Chat is a web application made for everyone to chill and chat. While there are many chat applications available, this app is designed as a learning experience to demonstrate the functionality of real-time messaging platforms by allowing users to communicate through text and media.

The goal is to explore web app patterns such as form handling, state management, database integration, real-time updates via WebSockets and cloud deployment.


## Technologies Used

#### Frontend

- Nuxt 3
- Typescript
- Tailwind CSS

#### Backend

- NestJS
- PostgreSQL
- Prisma ORM


## User Flow

#### 1. App Entry

When the user opens the app for the first time, they will be prompted to enter a username which is used as identification in the chat. This username is stored in the browser so no more prompt on revisit.

#### 2. Chat Interface Display

Once a username is entered, the chat interface is shown. The interface includes a scrollable message area, message input field, and send button. The message input field contains options to allow sending of files and emojis.

### 3. Sending Messages

Users can send messages by pressing Enter or clicking the Send button. Messages are displayed in the chat window along with the messages of all users. These messages are saved in the database so that new users can view past messages.

### 4. Real-time Broadcasting

Messages of other users can also be seen in the chat window as they send it in real-time.

### 5. New User Notification

When a new user joins, it will appear in the chat window displaying the new user's username.



