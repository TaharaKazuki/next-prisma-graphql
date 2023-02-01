import axios from 'axios'

const todosApi = axios.create({
  baseURL: 'http://localhost:3500',
})

export const todoUrlEndpoint = '/todos'

export const getTodos = async () => {
  const response = await todosApi.get('todoUrlEndpoint')
  return response.data
}

export type Param = {
  id: number
  userId: number
  title: string
  completed: boolean
}
export const addTodo = async (todo: Param) => {
  const { userId, title, completed } = todo
  const response = await todosApi.post(todoUrlEndpoint, { userId, title, completed })
  return response.data
}

export const updateTodo = async (todo: Param) => {
  const response = await todosApi.patch(`${todoUrlEndpoint}/${todo.id}`, todo)
  return response.data
}

export const deleteTodo = async (todo: Param) => {
  return await todosApi.patch(`${todoUrlEndpoint}/${todo.id}`, todo)
}
