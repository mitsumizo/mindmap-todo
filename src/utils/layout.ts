import dagre from '@dagrejs/dagre';
import { Node, Edge } from '@xyflow/react';

const nodeWidth = 240;
const nodeHeight = 120; // 編集・削除ボタン追加により高さを増加

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
) {
  const g = new dagre.graphlib.Graph();

  // ツリーの構造を分析して最適な間隔を計算
  const nodeCount = nodes.length;

  // 各階層の兄弟ノード数を計算
  const siblingCounts = new Map<string, number>();
  edges.forEach(edge => {
    const parent = edge.source;
    siblingCounts.set(parent, (siblingCounts.get(parent) || 0) + 1);
  });

  const maxSiblings = Math.max(...Array.from(siblingCounts.values()), 1);

  // 兄弟が多いほど横の間隔を広げる
  const baseNodesep = 120;
  const dynamicNodesep = baseNodesep + (maxSiblings * 15);

  // ノード数が多いほど縦の間隔も調整
  const baseRanksep = 150;
  const dynamicRanksep = baseRanksep + Math.floor(nodeCount / 10) * 10;

  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction,
    ranksep: dynamicRanksep,
    nodesep: dynamicNodesep,
    marginx: 50,
    marginy: 50,
    align: 'DL', // ダウン・レフト配置でバランスを改善
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const position = g.node(node.id);
    return {
      ...node,
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
