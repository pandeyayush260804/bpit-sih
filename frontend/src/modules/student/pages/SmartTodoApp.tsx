import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Star, 
  Clock, 
  Calendar, 
  Target, 
  Brain, 
  Trash2, 
  Edit3,
  Zap,
  TrendingUp,
  Award,
  Filter,
  Search,
  BookOpen,
  User,
  Users
} from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'study' | 'assignment' | 'exam' | 'project' | 'personal' | 'group';
  dueDate?: string;
  estimatedTime?: number;
  aiSuggested?: boolean;
  points: number;
  createdAt: Date;
  completedAt?: Date;
  tags: string[];
}

const SmartTodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'ai-suggested'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  // New todo form states
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newCategory, setNewCategory] = useState<'study' | 'assignment' | 'exam' | 'project' | 'personal' | 'group'>('study');
  const [newDueDate, setNewDueDate] = useState('');
  const [newEstimatedTime, setNewEstimatedTime] = useState<number>(30);

  // User stats
  const [userStats, setUserStats] = useState({
    totalPoints: 1250,
    streak: 7,
    completedToday: 5,
    productivity: 85
  });

  // Initialize with sample data and AI suggestions
  useEffect(() => {
    const sampleTodos: Todo[] = [
      {
        id: '1',
        text: 'Complete Data Structures Assignment - Binary Trees',
        completed: false,
        priority: 'urgent',
        category: 'assignment',
        dueDate: '2025-09-24',
        estimatedTime: 120,
        aiSuggested: false,
        points: 50,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ['coding', 'algorithms']
      },
      {
        id: '2',
        text: 'Review Database Normalization concepts',
        completed: false,
        priority: 'high',
        category: 'study',
        dueDate: '2025-09-25',
        estimatedTime: 90,
        aiSuggested: true,
        points: 35,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        tags: ['database', 'theory']
      },
      {
        id: '3',
        text: 'Practice LeetCode problems - Arrays & Strings',
        completed: true,
        priority: 'medium',
        category: 'study',
        estimatedTime: 60,
        aiSuggested: true,
        points: 25,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        completedAt: new Date(),
        tags: ['coding', 'practice']
      },
      {
        id: '4',
        text: 'Group project meeting - System Design',
        completed: false,
        priority: 'high',
        category: 'group',
        dueDate: '2025-09-23',
        estimatedTime: 90,
        aiSuggested: false,
        points: 40,
        createdAt: new Date(),
        tags: ['collaboration', 'design']
      },
      {
        id: '5',
        text: 'Prepare for Machine Learning exam',
        completed: false,
        priority: 'urgent',
        category: 'exam',
        dueDate: '2025-09-26',
        estimatedTime: 180,
        aiSuggested: true,
        points: 60,
        createdAt: new Date(),
        tags: ['ml', 'exam-prep']
      }
    ];
    
    setTodos(sampleTodos);
    
    // Generate AI suggestions periodically
    generateAISuggestions();
  }, []);

  const generateAISuggestions = () => {
    const aiSuggestions: Todo[] = [
      {
        id: Date.now() + Math.random().toString(),
        text: '🧠 AI Suggests: Review weak topics from last quiz',
        completed: false,
        priority: 'high',
        category: 'study',
        estimatedTime: 45,
        aiSuggested: true,
        points: 30,
        createdAt: new Date(),
        tags: ['ai-generated', 'review']
      },
      {
        id: Date.now() + Math.random().toString() + '2',
        text: '🧠 AI Suggests: Take a 15-minute break for better productivity',
        completed: false,
        priority: 'low',
        category: 'personal',
        estimatedTime: 15,
        aiSuggested: true,
        points: 10,
        createdAt: new Date(),
        tags: ['ai-generated', 'wellness']
      }
    ];

    setTodos(prev => [...prev, ...aiSuggestions]);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority: newPriority,
      category: newCategory,
      dueDate: newDueDate || undefined,
      estimatedTime: newEstimatedTime,
      aiSuggested: false,
      points: getPriorityPoints(newPriority),
      createdAt: new Date(),
      tags: extractTags(newTodo)
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    setShowAddForm(false);
    resetForm();
  };

  const getPriorityPoints = (priority: string): number => {
    switch (priority) {
      case 'urgent': return 50;
      case 'high': return 35;
      case 'medium': return 25;
      case 'low': return 15;
      default: return 25;
    }
  };

  const extractTags = (text: string): string[] => {
    const words = text.toLowerCase().split(' ');
    const commonTags = ['study', 'exam', 'project', 'coding', 'assignment', 'practice', 'review'];
    return commonTags.filter(tag => words.some(word => word.includes(tag)));
  };

  const resetForm = () => {
    setNewPriority('medium');
    setNewCategory('study');
    setNewDueDate('');
    setNewEstimatedTime(30);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { 
          ...todo, 
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : undefined
        };
        
        if (!todo.completed) {
          // Add points when completing
          setUserStats(prev => ({
            ...prev,
            totalPoints: prev.totalPoints + todo.points,
            completedToday: prev.completedToday + 1
          }));
        }
        
        return updated;
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) return;
    
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    // Main filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'ai-suggested':
        filtered = filtered.filter(todo => todo.aiSuggested);
        break;
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priorityFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(todo => todo.category === categoryFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'assignment': return <Edit3 className="w-4 h-4" />;
      case 'exam': return <Target className="w-4 h-4" />;
      case 'project': return <Zap className="w-4 h-4" />;
      case 'personal': return <User className="w-4 h-4" />;
      case 'group': return <Users className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Stats */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                🚀 Smart To-Do Dashboard
              </h1>
              <p className="text-gray-600">AI-powered task management for students</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4">
                <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                <div className="text-xs opacity-90">Total Points</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
                <div className="text-2xl font-bold">{userStats.streak}</div>
                <div className="text-xs opacity-90">Day Streak</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4">
                <div className="text-2xl font-bold">{userStats.completedToday}</div>
                <div className="text-xs opacity-90">Done Today</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
                <div className="text-2xl font-bold">{userStats.productivity}%</div>
                <div className="text-xs opacity-90">Productivity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Add Todo Button */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Main Filters */}
            {['all', 'active', 'completed', 'ai-suggested'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === filterType
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {filterType === 'ai-suggested' ? '🧠 AI' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'ai-suggested' && (
                  <span className="ml-1 text-xs">({todos.filter(t => t.aiSuggested && !t.completed).length})</span>
                )}
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Priority Filters */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1 rounded-lg text-sm border border-gray-200 bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">🔥 Urgent</option>
              <option value="high">⚡ High</option>
              <option value="medium">📋 Medium</option>
              <option value="low">🌱 Low</option>
            </select>

            {/* Category Filters */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 rounded-lg text-sm border border-gray-200 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="study">📚 Study</option>
              <option value="assignment">✏️ Assignment</option>
              <option value="exam">🎯 Exam</option>
              <option value="project">⚡ Project</option>
              <option value="group">👥 Group</option>
              <option value="personal">👤 Personal</option>
            </select>
          </div>
        </div>

        {/* Add Todo Form */}
        {showAddForm && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Task</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">🌱 Low</option>
                  <option value="medium">📋 Medium</option>
                  <option value="high">⚡ High</option>
                  <option value="urgent">🔥 Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="study">📚 Study</option>
                  <option value="assignment">✏️ Assignment</option>
                  <option value="exam">🎯 Exam</option>
                  <option value="project">⚡ Project</option>
                  <option value="group">👥 Group</option>
                  <option value="personal">👤 Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (minutes)</label>
                <input
                  type="number"
                  value={newEstimatedTime}
                  onChange={(e) => setNewEstimatedTime(parseInt(e.target.value) || 30)}
                  min="5"
                  max="480"
                  step="15"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={addTodo}
                disabled={!newTodo.trim()}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
              <button
                onClick={() => {setShowAddForm(false); resetForm();}}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">All caught up!</h3>
              <p className="text-gray-500">No tasks match your current filters.</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 transition-all duration-200 hover:shadow-xl ${
                  todo.completed ? 'opacity-75' : 'hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mt-1 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-500" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {editingId === todo.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') saveEdit();
                                if (e.key === 'Escape') setEditingId(null);
                              }}
                              autoFocus
                            />
                            <button
                              onClick={saveEdit}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {todo.text}
                              </h3>
                              {todo.aiSuggested && (
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Brain className="w-3 h-3" />
                                  AI
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                              {/* Priority Badge */}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                              </span>

                              {/* Category */}
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(todo.category)}
                                <span className="capitalize">{todo.category}</span>
                              </div>

                              {/* Time */}
                              {todo.estimatedTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{todo.estimatedTime}min</span>
                                </div>
                              )}

                              {/* Due Date */}
                              {todo.dueDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                                </div>
                              )}

                              {/* Points */}
                              <div className="flex items-center gap-1 text-yellow-600">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{todo.points}pts</span>
                              </div>
                            </div>

                            {/* Tags */}
                            {todo.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {todo.tags.map(tag => (
                                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {!todo.completed && editingId !== todo.id && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(todo.id, todo.text)}
                            className="text-gray-400 hover:text-indigo-500 transition-colors p-1"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* AI Suggestions Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={generateAISuggestions}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110 group"
          >
            <Brain className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartTodoApp;