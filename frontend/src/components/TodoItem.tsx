interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  return (
    <div className={`p-5 rounded-lg border border-gray-200 flex items-start justify-between transition-all duration-300 ease-in-out ${todo.completed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}`}>
      <div className="flex-1 mr-4">
        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.title}</h3>
            {todo.description && (
          <p className={`text-sm text-gray-500 mt-1 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>
        )}
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${todo.completed ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-4 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}