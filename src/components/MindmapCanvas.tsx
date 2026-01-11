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
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [tree]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#9333ea', strokeWidth: 2 },
        }}
      >
        <Background color="#e9d5ff" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            return node.data.completed ? '#86efac' : '#e9d5ff';
          }}
          className="!bg-white !border-2 !border-purple-300"
        />
      </ReactFlow>
    </div>
  );
}
