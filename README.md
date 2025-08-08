# mermaid-diagram-tool (MERN + Mermaid.js)

A web-based ER (Entity-Relationship) Diagram and other mermaid.js-diagram editor built with the MERN stack (MongoDB, Express, React, Node.js) and Mermaid.js for interactive diagram rendering. This app allows you to create, edit, save, and visualize ER diagrams with a resizable split view editor and preview.

## Features

- Real-time Mermaid.js rendering for ER diagrams.
- Draggable resizable split view to adjust code editor and preview widths.
- User authentication with JWT.
- Save, edit, and delete your diagrams with titles.
- Responsive design for desktop and mobile devices.
- Clean UI styled with Tailwind CSS.

## Installation & Setup

1. Clone the repository:

git clone https://github.com/Khushipant/mermaid-diagram-tool.git
cd mermaid-diagram-tool

text

2. Install dependencies for both client and server:

- Client (React app):

  ```
  cd client
  npm install
  ```

- Server (Express API):

  ```
  cd ../server
  npm install
  ```

3. Configure environment variables:

- Create `.env` files in each respective folder for server and client if needed.
- Example server `.env`:

  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```

4. Run development servers:

- Run client:

  ```
  npm start
  ```

- Run server:

  ```
  npm run dev
  ```

5. Visit `http://localhost:3000` in your browser to open the app.

## Usage

- Write Mermaid ER diagram code in the editor panel.
- Adjust the split view divider to resize editor and diagram preview.
- Save your diagrams after login or registering.
- Manage saved diagrams by editing or deleting them.
- Log in/out using the popup authentication.

## Technology Stack

- Frontend: React with Hooks and Context API, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Diagram Rendering: Mermaid.js
- Authentication: JWT
- HTTP Requests: Axios

## Folder Structure

/client # React frontend source
/server # Express backend API source

text

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.