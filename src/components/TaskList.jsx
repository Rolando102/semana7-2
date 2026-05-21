
import {useCallback,useMemo,useRef,useState, memo,} from "react";

function TaskList({ tasks, dispatch }) {
  const [search, setSearch] = useState("");

  const inputRef = useRef();

  // BUSQUEDA
  const searchedTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tasks, search]);

  // ELIMINAR
  const removeTask = useCallback(
    (id) => {
      dispatch({
        type: "REMOVE_TASK",
        payload: id,
      });
    },
    [dispatch]
  );

  // COMPLETAR
  const toggleTask = useCallback(
    (id) => {
      dispatch({
        type: "TOGGLE_TASK",
        payload: id,
      });
    },
    [dispatch]
  );

  // FOCUS
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="task-container">

      {/* HEADER */}
      <div className="task-header">
        <h2>
          📋 Lista de Tareas
        </h2>

        <span>
          Total: {searchedTasks.length}
        </span>
      </div>

      {/* BUSCADOR */}
      <div className="search-box">

        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button onClick={focusInput}>
          Focus
        </button>

      </div>

      {/* LISTA */}
      {searchedTasks.length === 0 ? (

        <div className="empty-task">
          <h3>
            No hay tareas registradas
          </h3>

          <p>
            Agrega una nueva tarea para
            comenzar.
          </p>
        </div>

      ) : (

        <div className="task-list">

          {searchedTasks.map((task) => (

            <div
              className={`task-item ${
                task.completed
                  ? "completed"
                  : ""
              }`}
              key={task.id}
            >

              {/* INFORMACION */}
              <div className="task-info">

                <h3>
                  {task.title}
                </h3>

                <div className="task-details">

                  <span
                    className={`priority ${
                      task.priority.toLowerCase()
                    }`}
                  >
                    {task.priority}
                  </span>

                  <span>
                    📅 {task.createdAt}
                  </span>

                  <span>
                    {task.completed
                      ? "✅ Completada"
                      : "⏳ Pendiente"}
                  </span>

                </div>

              </div>

              {/* BOTONES */}
              <div className="task-actions">

                <button
                  className="complete-btn"
                  onClick={() =>
                    toggleTask(task.id)
                  }
                >
                  ✓
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeTask(task.id)
                  }
                >
                  ✕
                </button>

              </div>

            </div>

          ))}

        </div>

      )}
    </div>
  );
}

export default memo(TaskList);