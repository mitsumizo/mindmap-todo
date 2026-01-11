import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { TodoTree, TodoNode, initialTree } from '../data/initialTree';

interface TodoStore {
  tree: TodoTree;

  // アクション
  toggleComplete: (nodeId: string) => void;
  toggleCollapse: (nodeId: string) => void;
  addNode: (parentId: string, label: string) => void;
  updateNode: (nodeId: string, label: string) => void;
  deleteNode: (nodeId: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const STORAGE_KEY = 'mindmap-todo-tree';

export const useTodoStore = create<TodoStore>((set, get) => ({
  tree: initialTree,

  toggleComplete: (nodeId: string) => {
    set((state) => {
      const node = state.tree.nodes[nodeId];
      if (!node) return state;

      const updatedNode = {
        ...node,
        completed: !node.completed,
        completedAt: !node.completed ? new Date() : undefined,
      };

      const newTree = {
        ...state.tree,
        nodes: {
          ...state.tree.nodes,
          [nodeId]: updatedNode,
        },
      };

      // localStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree));

      return { tree: newTree };
    });
  },

  toggleCollapse: (nodeId: string) => {
    set((state) => {
      const node = state.tree.nodes[nodeId];
      if (!node) return state;

      const updatedNode = {
        ...node,
        collapsed: !node.collapsed,
      };

      const newTree = {
        ...state.tree,
        nodes: {
          ...state.tree.nodes,
          [nodeId]: updatedNode,
        },
      };

      // localStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree));

      return { tree: newTree };
    });
  },

  addNode: (parentId: string, label: string) => {
    set((state) => {
      const parent = state.tree.nodes[parentId];
      if (!parent) return state;

      const newNodeId = uuidv4();
      const newNode: TodoNode = {
        id: newNodeId,
        label,
        completed: false,
        parentId,
        children: [],
        collapsed: false,
        createdAt: new Date(),
      };

      const updatedParent = {
        ...parent,
        children: [...parent.children, newNodeId],
      };

      const newTree = {
        ...state.tree,
        nodes: {
          ...state.tree.nodes,
          [parentId]: updatedParent,
          [newNodeId]: newNode,
        },
      };

      // localStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree));

      return { tree: newTree };
    });
  },

  updateNode: (nodeId: string, label: string) => {
    set((state) => {
      const node = state.tree.nodes[nodeId];
      if (!node) return state;

      const updatedNode = {
        ...node,
        label,
      };

      const newTree = {
        ...state.tree,
        nodes: {
          ...state.tree.nodes,
          [nodeId]: updatedNode,
        },
      };

      // localStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree));

      return { tree: newTree };
    });
  },

  deleteNode: (nodeId: string) => {
    set((state) => {
      const node = state.tree.nodes[nodeId];
      if (!node || !node.parentId) return state; // ルートノードは削除不可

      const parent = state.tree.nodes[node.parentId];
      if (!parent) return state;

      // 親から子を削除
      const updatedParent = {
        ...parent,
        children: parent.children.filter((id) => id !== nodeId),
      };

      // 削除するノードとその子孫を収集
      const nodesToDelete = new Set<string>([nodeId]);
      const collectDescendants = (id: string) => {
        const currentNode = state.tree.nodes[id];
        if (currentNode) {
          currentNode.children.forEach((childId) => {
            nodesToDelete.add(childId);
            collectDescendants(childId);
          });
        }
      };
      collectDescendants(nodeId);

      // 新しいnodesオブジェクトを作成（削除対象を除く）
      const newNodes = { ...state.tree.nodes };
      nodesToDelete.forEach((id) => {
        delete newNodes[id];
      });
      newNodes[node.parentId] = updatedParent;

      const newTree = {
        ...state.tree,
        nodes: newNodes,
      };

      // localStorageに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTree));

      return { tree: newTree };
    });
  },

  loadFromStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedTree = JSON.parse(stored);
        // Dateオブジェクトを復元
        Object.keys(parsedTree.nodes).forEach((key) => {
          const node = parsedTree.nodes[key];
          node.createdAt = new Date(node.createdAt);
          if (node.completedAt) {
            node.completedAt = new Date(node.completedAt);
          }
        });
        set({ tree: parsedTree });
      } catch (error) {
        console.error('Failed to load from storage:', error);
      }
    }
  },

  saveToStorage: () => {
    const { tree } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
  },
}));
