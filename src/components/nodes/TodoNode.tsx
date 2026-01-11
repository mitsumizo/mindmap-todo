import { memo, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useTodoStore } from '../../store/todoStore';
import type { TodoNodeData } from '../../utils/treeToFlow';

interface TodoNodeProps {
  id: string;
  data: TodoNodeData;
}

function TodoNodeComponent({ id, data: nodeData }: TodoNodeProps) {
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const toggleCollapse = useTodoStore((state) => state.toggleCollapse);
  const addNode = useTodoStore((state) => state.addNode);
  const updateNode = useTodoStore((state) => state.updateNode);
  const deleteNode = useTodoStore((state) => state.deleteNode);
  const setPriority = useTodoStore((state) => state.setPriority);
  const tree = useTodoStore((state) => state.tree);

  const isRootNode = tree.rootId === id;

  // 優先順位に基づく色を決定
  const getNodeColors = () => {
    if (nodeData.completed) {
      return {
        bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
        border: 'border-emerald-400',
        shadow: 'shadow-emerald-200/50',
      };
    }

    switch (nodeData.priority) {
      case 'high':
        return {
          bg: 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50',
          border: 'border-red-400',
          shadow: 'shadow-red-200/50',
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
          border: 'border-yellow-400',
          shadow: 'shadow-yellow-200/50',
        };
      case 'low':
        return {
          bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
          border: 'border-green-400',
          shadow: 'shadow-green-200/50',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30',
          border: 'border-purple-400',
          shadow: 'shadow-purple-200/50',
        };
    }
  };

  const nodeColors = getNodeColors();

  const handleCheckboxChange = useCallback(() => {
    toggleComplete(id);
  }, [id, toggleComplete]);

  const handleCollapseToggle = useCallback(() => {
    toggleCollapse(id);
  }, [id, toggleCollapse]);

  const handleAddChild = useCallback(() => {
    const newLabel = prompt('新しいタスク名を入力してください 🎯');
    if (newLabel && newLabel.trim()) {
      addNode(id, newLabel.trim());
    }
  }, [id, addNode]);

  const handleEdit = useCallback(() => {
    const newLabel = prompt('タスク名を編集 ✏️', nodeData.label);
    if (newLabel && newLabel.trim() && newLabel.trim() !== nodeData.label) {
      updateNode(id, newLabel.trim());
    }
  }, [id, nodeData.label, updateNode]);

  const handleDelete = useCallback(() => {
    if (isRootNode) {
      alert('ルートノードは削除できません 🚫');
      return;
    }
    const confirmed = confirm(`「${nodeData.label}」を削除しますか？\n（子ノードも一緒に削除されます）`);
    if (confirmed) {
      deleteNode(id);
    }
  }, [id, nodeData.label, deleteNode, isRootNode]);

  const handleSetPriority = useCallback(() => {
    const options = '1: 🔴 高\n2: 🟡 中\n3: 🟢 低\n0: なし';
    const choice = prompt(`優先順位を選択してください 🎯\n\n${options}`);

    if (choice === null) return; // キャンセル

    switch (choice.trim()) {
      case '1':
        setPriority(id, 'high');
        break;
      case '2':
        setPriority(id, 'medium');
        break;
      case '3':
        setPriority(id, 'low');
        break;
      case '0':
        setPriority(id, undefined);
        break;
      default:
        alert('1, 2, 3, または 0 を入力してください');
    }
  }, [id, setPriority]);

  return (
    <div
      className={`
        px-5 py-4 rounded-2xl shadow-xl border-2 min-w-[220px]
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1
        ${nodeColors.bg} ${nodeColors.border} ${nodeColors.shadow}
      `}
    >
      {/* 親ノードからの接続ハンドル */}
      <Handle
        type="target"
        position={Position.Top}
        className={`w-3 h-3 !rounded-full ${
          nodeData.completed ? '!bg-emerald-500' : '!bg-purple-500'
        } !border-2 !border-white shadow-lg transition-all duration-300`}
      />

      <div className="flex items-center gap-3">
        {/* チェックボックス */}
        <div className="relative">
          <input
            type="checkbox"
            checked={nodeData.completed}
            onChange={handleCheckboxChange}
            className={`
              w-6 h-6 cursor-pointer rounded-md
              transition-all duration-300
              ${nodeData.completed
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
            ${nodeData.completed
              ? 'line-through text-gray-500 opacity-75'
              : 'text-gray-800'
            }
          `}
        >
          {nodeData.label}
        </span>

        {/* 折りたたみボタン */}
        {nodeData.hasChildren && (
          <button
            onClick={handleCollapseToggle}
            className={`
              px-3 py-1.5 text-xs font-bold rounded-full
              transition-all duration-300 ease-out
              hover:scale-110 active:scale-95
              ${nodeData.collapsed
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/50 hover:shadow-xl'
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-300/50 hover:shadow-xl'
              }
            `}
          >
            {nodeData.collapsed ? '▶' : '▼'}
          </button>
        )}

        {/* ノード追加ボタン */}
        <button
          onClick={handleAddChild}
          className="
            px-3 py-1.5 text-xs font-bold rounded-full
            bg-gradient-to-r from-emerald-500 to-teal-500
            text-white shadow-lg shadow-emerald-300/50
            transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-xl active:scale-95
            hover:from-emerald-600 hover:to-teal-600
          "
          title="子タスクを追加"
        >
          + 追加
        </button>
      </div>

      {/* 編集・削除・優先度ボタン */}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
        <button
          onClick={handleEdit}
          className="
            flex-1 px-2 py-1 text-xs font-semibold rounded-lg
            bg-gradient-to-r from-blue-500 to-cyan-500
            text-white shadow-md shadow-blue-300/50
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-lg active:scale-95
            hover:from-blue-600 hover:to-cyan-600
          "
          title="タスク名を編集"
        >
          ✏️ 編集
        </button>

        <button
          onClick={handleSetPriority}
          className="
            flex-1 px-2 py-1 text-xs font-semibold rounded-lg
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white shadow-md shadow-purple-300/50
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-lg active:scale-95
            hover:from-purple-600 hover:to-pink-600
          "
          title="優先順位を設定"
        >
          🎯 優先度
        </button>

        {!isRootNode && (
          <button
            onClick={handleDelete}
            className="
              flex-1 px-2 py-1 text-xs font-semibold rounded-lg
              bg-gradient-to-r from-red-500 to-rose-500
              text-white shadow-md shadow-red-300/50
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-lg active:scale-95
              hover:from-red-600 hover:to-rose-600
            "
            title="タスクを削除"
          >
            🗑️ 削除
          </button>
        )}
      </div>

      {/* 完了バッジ */}
      {nodeData.completed && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
          ✓
        </div>
      )}

      {/* 優先順位バッジ（完了していない場合のみ） */}
      {!nodeData.completed && nodeData.priority && (
        <div
          className={`
            absolute -top-2 -left-2 text-xs font-bold px-2 py-1 rounded-full shadow-lg
            ${nodeData.priority === 'high' ? 'bg-gradient-to-br from-red-400 to-rose-500 text-white' : ''}
            ${nodeData.priority === 'medium' ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : ''}
            ${nodeData.priority === 'low' ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' : ''}
          `}
          style={{ whiteSpace: 'nowrap' }}
        >
          {nodeData.priority === 'high' && '🔴 高'}
          {nodeData.priority === 'medium' && '🟡 中'}
          {nodeData.priority === 'low' && '🟢 低'}
        </div>
      )}

      {/* 子ノードへの接続ハンドル */}
      {nodeData.hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={`w-3 h-3 !rounded-full ${
            nodeData.completed ? '!bg-emerald-500' : '!bg-purple-500'
          } !border-2 !border-white shadow-lg transition-all duration-300`}
        />
      )}
    </div>
  );
}

export const TodoNode = memo(TodoNodeComponent);
