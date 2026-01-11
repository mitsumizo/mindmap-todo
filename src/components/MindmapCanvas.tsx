import { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTodoStore } from '../store/todoStore';
import { convertTreeToFlow } from '../utils/treeToFlow';
import { getLayoutedElements } from '../utils/layout';
import { TodoNode } from './nodes/TodoNode';

const nodeTypes: NodeTypes = {
  todoNode: TodoNode,
};

export function MindmapCanvas() {
  const tree = useTodoStore((state) => state.tree);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // ツリー変更時にReact Flow要素を再計算
  useEffect(() => {
    const { nodes: flowNodes, edges: flowEdges } = convertTreeToFlow(tree);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      flowNodes,
      flowEdges
    );

    // エッジのスタイルを動的に設定（完了ノードからのエッジの色を変える）
    const styledEdges = layoutedEdges.map((edge) => {
      const sourceNode = tree.nodes[edge.source];
      const targetNode = tree.nodes[edge.target];
      const isCompleted = sourceNode?.completed || targetNode?.completed;

      return {
        ...edge,
        animated: !isCompleted, // 未完了のエッジはアニメーション
        style: {
          stroke: isCompleted
            ? '#10b981' // emerald-500（完了）
            : '#a855f7', // purple-500（未完了）
          strokeWidth: 3,
          filter: isCompleted
            ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))'
            : 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
        },
      };
    });

    setNodes(layoutedNodes);
    setEdges(styledEdges);
  }, [tree]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background
          color="#c084fc"
          gap={20}
          size={2}
          className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100"
        />
        <Controls
          className="!bg-white !border-2 !border-purple-400 !shadow-2xl !rounded-xl"
        />
        <MiniMap
          nodeColor={(node) => {
            return node.data.completed
              ? '#10b981' // emerald-500
              : '#a855f7'; // purple-500
          }}
          className="!bg-gradient-to-br !from-white !to-purple-50 !border-4 !border-purple-400 !shadow-2xl !rounded-xl"
          maskColor="rgba(168, 85, 247, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
