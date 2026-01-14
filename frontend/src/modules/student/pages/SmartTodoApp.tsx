import { useState, useEffect } from "react";
import {
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  BookOpen,
  ClipboardList,
  Target,
  User,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Priority = "low" | "medium" | "high";
type Category = "study" | "assignment" | "exam" | "personal";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
}

/* ---------------- STORAGE ---------------- */

const STORAGE_KEY = "SMART_TODO_V1";

/* ---------------- COMPONENT ---------------- */

const SmartTodoApp = () => {
  /* ✅ LOAD FROM LOCALSTORAGE (REFRESH SAFE) */
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("study");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  /* ✅ SAVE TO LOCALSTORAGE ON CHANGE */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /* ---------------- LOGIC ---------------- */

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority,
        category,
      },
    ]);

    setText("");
    setPriority("medium");
    setCategory("study");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  /* ---------------- UI HELPERS ---------------- */

  const priorityStyle = (p: Priority) => {
    if (p === "high") return "bg-red-100 text-red-600";
    if (p === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };

  const categoryIcon = (c: Category) => {
    if (c === "study") return <BookOpen size={14} />;
    if (c === "assignment") return <ClipboardList size={14} />;
    if (c === "exam") return <Target size={14} />;
    return <User size={14} />;
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📝 To-Do</h1>
          <p className="text-sm text-gray-500">
            Simple • Offline • Persistent
          </p>
        </div>

        {/* ADD */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a task…"
            className="flex-1 px-4 py-2 border rounded-lg outline-none"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="study">Study</option>
            <option value="assignment">Assignment</option>
            <option value="exam">Exam</option>
            <option value="personal">Personal</option>
          </select>

          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LIST */}
        {visibleTodos.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Nothing here yet 👌
          </p>
        ) : (
          <ul className="space-y-3">
            {visibleTodos.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <button onClick={() => toggleTodo(t.id)}>
                  {t.completed ? (
                    <CheckCircle2 className="text-green-600" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </button>

                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      t.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {t.text}
                  </p>

                  <div className="flex gap-2 text-xs mt-1 items-center">
                    <span
                      className={`px-2 py-0.5 rounded-full ${priorityStyle(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      {categoryIcon(t.category)}
                      {t.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(t.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SmartTodoApp;
