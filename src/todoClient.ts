// todoClient.ts

import axios from 'axios';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
export {Todo};

const apiUrl = 'https://your-todo-api.com/api/todos'; // Replace with your API endpoint URL

async function createTodo(newTodo: Todo): Promise<void> {
    try {
      const response = await axios.post(apiUrl, newTodo);
  
      if (response.status === 201) {
        console.log('Todo item created successfully:', response.data);
      } else {
        console.error('Failed to create todo item:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error creating todo item:', (error as Error).message);
    }
  }  

export { createTodo };
