import { memo, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useTodoStore } from '../../store/todoStore';
import { TodoNodeData } from '../../utils/treeToFlow';

function TodoNodeComponent({ id, data }: NodeProps<TodoNodeData>) {
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const toggleCollapse = useTodoStore((state) => state.toggleCollapse);

  const handleCheckboxChange = useCallback(() => {
    toggleComplete(id);
  }, [id, toggleComplete]);

  const handleCollapseToggle = useCallback(() => {
    toggleCollapse(id);
  }, [id, toggleCollapse]);

  return (
    <div
      className={`
        px-5 py-4 rounded-2xl shadow-xl border-2 min-w-[220px]
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1
        ${data.completed
          ? 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-400 shadow-emerald-200/50'
          : 'bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-purple-400 shadow-purple-200/50'
        }
      `}
    >
      {/* 親ノードからの接続ハンドル */}
      <Handle
        type="target"
        position={Position.Top}
        className={`w-3 h-3 !rounded-full ${
          data.completed ? '!bg-emerald-500' : '!bg-purple-500'
        } !border-2 !border-white shadow-lg transition-all duration-300`}
      />

      <div className="flex items-center gap-3">
        {/* チェックボックス */}
        <div className="relative">
          <input
            type="checkbox"
            checked={data.completed}
            onChange={handleCheckboxChange}
            className={`
              w-6 h-6 cursor-pointer rounded-md
              transition-all duration-300
              ${data.completed
                ? 'accent-emerald-500 scale-110'
                : 'accent-purple-500 hover:scale-110'
              }
            `}
          />
        </div>

        {/* ラベル */}
        <span
          className={`
            flex-1 text-sm font-semibold tracking-wide
            transition-all duration-300
            ${data.completed
              ? 'line-through text-gray-500 opacity-75'
              : 'text-gray-800'
            }
          `}
        >
          {data.label}
        </span>

        {/* 折りたたみボタン */}
        {data.hasChildren && (
          <button
            onClick={handleCollapseToggle}
            className={`
              px-3 py-1.5 text-xs font-bold rounded-full
              transition-all duration-300 ease-out
              hover:scale-110 active:scale-95
              ${data.collapsed
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/50 hover:shadow-xl'
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-300/50 hover:shadow-xl'
              }
            `}
          >
            {data.collapsed ? '▶' : '▼'}
          </button>
        )}
      </div>

      {/* 完了バッジ */}
      {data.completed && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
          ✓
        </div>
      )}

      {/* 子ノードへの接続ハンドル */}
      {data.hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={`w-3 h-3 !rounded-full ${
            data.completed ? '!bg-emerald-500' : '!bg-purple-500'
          } !border-2 !border-white shadow-lg transition-all duration-300`}
        />
      )}
    </div>
  );
}

export const TodoNode = memo(TodoNodeComponent);
