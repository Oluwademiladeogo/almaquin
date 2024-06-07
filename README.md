# Almaquin
---

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB (atlas usage is also acceptable)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Oluwademiladeogo/almaquin
   ```

2. Install dependencies:

   ```bash
   cd almaquin
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   JWTKEY=<your-jwtkey>
   MONGODB_URI=<your-mongodb-connection-string>
   NODE_ENV=
   PORT=<port-number>
   EMAIL=
   EMAIL_PASSWORD=<your GMAIL app password for AlmaQuin>
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

## Usage

- Access the app by navigating to `http://localhost:<port>/app`.
- Log in using your admin credentials.
- Explore and manage resources using your required interface.

## Customization

### Resource Configuration

Resource configurations are located in the `app.js` file. You can customize resource properties, actions, and appearance here.

### Authentication

Authentication middleware is located in the `middleware` folder. You can modify authentication strategies, such as JWT token verification, here.

### Error Handling

Error handling middleware is located in the `middleware` folder. Customize error responses and logging according to your needs.

---
