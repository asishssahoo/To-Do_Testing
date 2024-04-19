# TodoList Application

This TodoList application is designed to help you manage your tasks effectively. It provides a simple and intuitive interface for adding, editing, and deleting tasks, along with user authentication to secure your task list.

## Features

- **Task Management**:
  - Add new tasks with titles and descriptions.
  - Mark tasks as completed or incomplete.
  - Edit existing tasks to update titles or descriptions.
  - Delete tasks you no longer need.

- **User Authentication**:
  - Securely register and log in to manage your personal task list.
  - Authentication ensures that only authorized users can access and modify their tasks.

- **Database Integration**:
  - Utilizes MySQL database for storing task data persistently.
  - Implements CRUD (Create, Read, Update, Delete) operations to interact with the database.

## Installation

Follow these steps to set up the TodoList application locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/asishssahoo/to-do_Testing.git
   cd todo-list
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Database**:
   - Create a MySQL database named `todolist1`.
   - Import the database schema from `database/schema.sql` to set up the required tables.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```plaintext
     DB_HOST=localhost
     DB_USER=****
     DB_PASSWORD=****
     DB_NAME=todolist1
     ```

5. **Start the Server**:
   ```bash
   npm start
   ```

6. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:3000` to access the TodoList application.

## Usage

1. **User Registration**:
   - Sign up for a new account to access the task management features.

2. **Login**:
   - Log in with your credentials to view and manage your tasks.

3. **Task Management**:
   - Use the interface to add, edit, mark as completed/incomplete, or delete tasks.

## API Endpoints

- **GET /tasks**:
  - Retrieves all tasks from the database.

- **POST /tasks**:
  - Creates a new task in the database.

- **PUT /tasks/:id**:
  - Updates an existing task identified by `id` in the database.

- **DELETE /tasks/:id**:
  - Deletes a task with the specified `id` from the database.

## Contributing

Contributions are welcome! Follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
