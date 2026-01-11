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
        px-4 py-3 rounded-lg shadow-md border-2 min-w-[200px]
        ${data.completed
          ? 'bg-green-50 border-green-300'
          : 'bg-white border-purple-300'
        }
      `}
    >
      {/* 親ノードからの接続ハンドル */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-purple-400"
      />

      <div className="flex items-center gap-2">
        {/* チェックボックス */}
        <input
          type="checkbox"
          checked={data.completed}
          onChange={handleCheckboxChange}
          className="w-5 h-5 cursor-pointer accent-green-500"
        />

        {/* ラベル */}
        <span
          className={`
            flex-1 text-sm font-medium
            ${data.completed ? 'line-through text-gray-500' : 'text-gray-800'}
          `}
        >
          {data.label}
        </span>

        {/* 折りたたみボタン */}
        {data.hasChildren && (
          <button
            onClick={handleCollapseToggle}
            className="px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 rounded transition-colors"
          >
            {data.collapsed ? '▶' : '▼'}
          </button>
        )}
      </div>

      {/* 子ノードへの接続ハンドル */}
      {data.hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 !bg-purple-400"
        />
      )}
    </div>
  );
}

export const TodoNode = memo(TodoNodeComponent);
