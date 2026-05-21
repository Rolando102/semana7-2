
import {useState,useMemo,useCallback} from "react";
import {BarChart,Bar, XAxis,YAxis,Tooltip,ResponsiveContainer, PieChart,Pie,Cell,LineChart,Line,CartesianGrid, Legend,} from "recharts";
import TaskList from "./components/TaskList";
import {ThemeProvider,useTheme,} from "./contexts/ThemeContext";
import { useTasksReducer } from "./hooks/useTasksReducer";
import Footer from "./components/Footer";

function Dashboard() {
  const { darkMode, toggleTheme } =
    useTheme();

  const [title, setTitle] = useState("");

  const [priority, setPriority] =
    useState("Media");

  const [filter, setFilter] =
    useState("ALL");

  const [state, dispatch] =
    useTasksReducer();

  // AGREGAR TAREA
  const addTask = useCallback(() => {
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title,
        priority,
        completed: false,
        createdAt:
          new Date().toLocaleDateString(),
      },
    });

    setTitle("");
  }, [title, priority, dispatch]);

  // FILTRO
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "COMPLETED":
        return state.tasks.filter(
          (task) => task.completed
        );

      case "PENDING":
        return state.tasks.filter(
          (task) => !task.completed
        );

      default:
        return state.tasks;
    }
  }, [filter, state.tasks]);

  // ESTADISTICAS
  const stats = useMemo(() => {
    const total = state.tasks.length;

    const completed =
      state.tasks.filter(
        (task) => task.completed
      ).length;

    const pending = total - completed;

    return {
      total,
      completed,
      pending,
    };
  }, [state.tasks]);

  // DATOS GRAFICAS
  const priorityData = useMemo(() => {
    const alta = state.tasks.filter(
      (t) => t.priority === "Alta"
    ).length;

    const media = state.tasks.filter(
      (t) => t.priority === "Media"
    ).length;

    const baja = state.tasks.filter(
      (t) => t.priority === "Baja"
    ).length;

    return [
      { name: "Alta", value: alta },
      { name: "Media", value: media },
      { name: "Baja", value: baja },
    ];
  }, [state.tasks]);

  // PIE CHART
  const completionData = [
    {
      name: "Completadas",
      tareas: stats.completed,
    },
    {
      name: "Pendientes",
      tareas: stats.pending,
    },
  ];

  // LINE CHART
  const lineData = state.tasks.map(
    (task, index) => ({
      name: `T${index + 1}`,
      tareas: index + 1,
    })
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="container">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1 className="title">
              Dashboard React Hooks
            </h1>

            <p className="subtitle">
              Gestión avanzada de tareas
            </p>
          </div>

          <button onClick={toggleTheme}>
            {darkMode
              ? "Claro"
              : "Oscuro"}
          </button>
        </div>

        {/* ESTADISTICAS */}
        <div className="stats-grid">

          <div className="card">
            <h2>Total</h2>
            <p>{stats.total}</p>
          </div>

          <div className="card">
            <h2>Completadas</h2>
            <p>{stats.completed}</p>
          </div>

          <div className="card">
            <h2>Pendientes</h2>
            <p>{stats.pending}</p>
          </div>

        </div>

        {/* FORMULARIO */}
        <div className="form-container">

          <input
            type="text"
            placeholder="Nueva tarea..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>

          <button onClick={addTask}>
            Agregar
          </button>

        </div>

        {/* FILTROS */}
        <div className="filters">

          <button
            onClick={() => setFilter("ALL")}
          >
            Todas
          </button>

          <button
            onClick={() =>
              setFilter("COMPLETED")
            }
          >
            Completadas
          </button>

          <button
            onClick={() =>
              setFilter("PENDING")
            }
          >
            Pendientes
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "SORT_TASKS",
              })
            }
          >
            Ordenar
          </button>

        </div>

        {/* GRAFICAS */}
        <div className="charts-grid">

          {/* GRAFICA BARRAS */}
          <div className="chart-card">

            <h2>
              Tareas por Prioridad
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={priorityData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* GRAFICA PIE */}
          <div className="chart-card">

            <h2>
              Estado de las Tareas
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={completionData}
                  dataKey="tareas"
                  outerRadius={100}
                  label
                >
                  <Cell />
                  <Cell />
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          {/* GRAFICA LINEAL */}
          <div className="chart-card line-chart">

            <h2>
              Crecimiento de tareas
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={lineData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="tareas"
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* LISTA */}
        <TaskList
          tasks={filteredTasks}
          dispatch={dispatch}
        />

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}