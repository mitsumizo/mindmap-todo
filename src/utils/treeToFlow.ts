import { Node, Edge } from '@xyflow/react';
import { TodoTree } from '../data/initialTree';

export interface TodoNodeData extends Record<string, unknown> {
  label: string;
  completed: boolean;
  collapsed: boolean;
  hasChildren: boolean;
}

export function convertTreeToFlow(
  tree: TodoTree
): { nodes: Node<TodoNodeData>[]; edges: Edge[] } {
  const nodes: Node<TodoNodeData>[] = [];
  const edges: Edge[] = [];

  // 表示すべきノードを再帰的に収集
  const collectVisibleNodes = (nodeId: string, isVisible: boolean = true) => {
    const node = tree.nodes[nodeId];
    if (!node) return;

    if (isVisible) {
      nodes.push({
        id: node.id,
        type: 'todoNode',
        data: {
          label: node.label,
          completed: node.completed,
          collapsed: node.collapsed,
          hasChildren: node.children.length > 0,
        },
        position: { x: 0, y: 0 }, // レイアウト関数で計算
      });

      // エッジを追加（親ノードが存在する場合）
      if (node.parentId) {
        edges.push({
          id: `${node.parentId}-${node.id}`,
          source: node.parentId,
          target: node.id,
          type: 'smoothstep',
          animated: false,
        });
      }
    }

    // 子ノードを処理（折りたたまれていない場合のみ）
    if (!node.collapsed && isVisible) {
      node.children.forEach((childId) => {
        collectVisibleNodes(childId, true);
      });
    } else if (node.collapsed) {
      // 折りたたまれている場合、子孫はスキップ
      node.children.forEach((childId) => {
        collectVisibleNodes(childId, false);
      });
    }
  };

  collectVisibleNodes(tree.rootId);

  return { nodes, edges };
}
