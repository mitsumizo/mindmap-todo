import dagre from '@dagrejs/dagre';
import { Node, Edge } from '@xyflow/react';

const nodeWidth = 240;
const nodeHeight = 80;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
) {
  const g = new dagre.graphlib.Graph();

  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction,
    ranksep: 120, // ランク間の距離を広げる（80 → 120）
    nodesep: 80,  // ノード間の距離を広げる（40 → 80）
    marginx: 20,  // 左右のマージン
    marginy: 20,  // 上下のマージン
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
