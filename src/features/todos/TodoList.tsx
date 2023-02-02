import { useState, FormEvent } from 'react'
import type { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast'
import type { Param } from '../../api/todosApi'

import useSWR from 'swr'

export const TodoList: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('')

  const addTodoMutation = async (newTodo: Param) => {
    try {
      toast.success('Success Add new item', {
        duration: 1000,
        icon: '🎉',
      })
    } catch (error) {
      toast.error('Failed to add the new item', {
        duration: 1000,
      })
    }
  }

  const updateTodoMutation = async (updateTodo) => {
    try {
      toast.success('Success Updated item', {
        duration: 1000,
        icon: '🚀',
      })
    } catch (error) {
      toast.error('Failed to update the item.', {
        duration: 1000,
      })
    }
  }

  const deleteTodoMutation = async ({ id }) => {
    try {
      toast.success('Success! Deleted item.', {
        duration: 1000,
      })
    } catch (err) {
      toast.error('Failed to delete the item.', {
        duration: 1000,
      })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodoMutation({ userId: 1, title: newTodo, completed: false, id: 9999 })
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  )

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => updateTodoMutation({ ...todo, completed: !todo.completed })}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodoMutation({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      )
    })
  }

  return (
    <main>
      <Toaster toastOptions={{ position: 'top-center' }} />
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  )
}
