

import { useReducer } from "react";

// ESTADO INICIAL
const initialState = {
  tasks: [

    {
      id: 1,
      title: "Implementar React Hooks",
      priority: "Alta",
      completed: false,
      createdAt: "21/05/2026",
    },

    {
      id: 2,
      title: "Crear Dashboard Administrativo",
      priority: "Alta",
      completed: true,
      createdAt: "21/05/2026",
    },

    {
      id: 3,
      title: "Agregar gráficas con Recharts",
      priority: "Media",
      completed: false,
      createdAt: "21/05/2026",
    },

    {
      id: 4,
      title: "Configurar React Router",
      priority: "Media",
      completed: true,
      createdAt: "21/05/2026",
    },

  ],
};

// REDUCER
function tasksReducer(state, action) {

  switch (action.type) {

    // AGREGAR
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload,
        ],
      };

    // ELIMINAR
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) =>
            task.id !== action.payload
        ),
      };

    // COMPLETAR
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(
          (task) =>
            task.id === action.payload
              ? {
                  ...task,
                  completed:
                    !task.completed,
                }
              : task
        ),
      };

    // ORDENAR
    case "SORT_TASKS":
      return {
        ...state,
        tasks: [...state.tasks].sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        ),
      };

    default:
      return state;
  }
}

// CUSTOM HOOK
export function useTasksReducer() {
  return useReducer(
    tasksReducer,
    initialState
  );
}