export interface TodoNode {
  id: string;
  label: string;
  completed: boolean;
  parentId: string | null;
  children: string[];
  collapsed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TodoTree {
  nodes: Record<string, TodoNode>;
  rootId: string;
  version: string;
}
