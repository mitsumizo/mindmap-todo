import { v4 as uuidv4 } from 'uuid';

// 型定義
export interface TodoNode {
  id: string;
  label: string;
  completed: boolean;
  parentId: string | null;
  children: string[];
  collapsed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority?: 'high' | 'medium' | 'low';  // 優先順位（オプショナル）
}

export interface TodoTree {
  nodes: Record<string, TodoNode>;
  rootId: string;
  version: string;
}

// IDを事前に生成
const rootId = uuidv4();

// カテゴリのID
const foundationId = uuidv4();
const interviewId = uuidv4();
const englishId = uuidv4();
const techId = uuidv4();

// 転職活動の土台の子ノード
const linkedinId = uuidv4();
const githubId = uuidv4();
const portfolioId = uuidv4();
const cvId = uuidv4();

// 面接突破の子ノード
const interviewPrepId = uuidv4();
const algorithmId = uuidv4();

// 英語力向上の子ノード
const vocabularyId = uuidv4();
const circuitId = uuidv4();
const ieltsId = uuidv4();

// 技術力向上の子ノード
const sqlId = uuidv4();
const genAiId = uuidv4();
const terraformId = uuidv4();
const dataEngId = uuidv4();

const createNode = (
  id: string,
  label: string,
  parentId: string | null,
  children: string[] = [],
  priority?: 'high' | 'medium' | 'low'
): TodoNode => ({
  id,
  label,
  completed: false,
  parentId,
  children,
  collapsed: false,
  createdAt: new Date(),
  priority,
});

export const initialTree: TodoTree = {
  nodes: {
    // ルートノード
    [rootId]: createNode(rootId, '30歳までにグローバルで働く', null, [
      foundationId,
      interviewId,
      englishId,
      techId,
    ]),

    // カテゴリノード
    [foundationId]: createNode(foundationId, '転職活動の土台', rootId, [
      linkedinId,
      githubId,
      portfolioId,
      cvId,
    ]),
    [interviewId]: createNode(interviewId, '面接突破', rootId, [
      interviewPrepId,
      algorithmId,
    ]),
    [englishId]: createNode(englishId, '英語力向上', rootId, [
      vocabularyId,
      circuitId,
      ieltsId,
    ]),
    [techId]: createNode(techId, '技術力向上', rootId, [
      sqlId,
      genAiId,
      terraformId,
      dataEngId,
    ]),

    // 転職活動の土台の子ノード
    [linkedinId]: createNode(linkedinId, 'LinkedIn更新', foundationId, [], 'high'),
    [githubId]: createNode(githubId, 'GitHub整理', foundationId, [], 'medium'),
    [portfolioId]: createNode(portfolioId, 'ポートフォリオ作成', foundationId, [], 'high'),
    [cvId]: createNode(cvId, 'CV整理', foundationId, [], 'medium'),

    // 面接突破の子ノード
    [interviewPrepId]: createNode(interviewPrepId, '面接準備', interviewId, [], 'high'),
    [algorithmId]: createNode(algorithmId, 'アルゴリズム勉強', interviewId, [], 'medium'),

    // 英語力向上の子ノード
    [vocabularyId]: createNode(vocabularyId, '単語力', englishId, [], 'low'),
    [circuitId]: createNode(circuitId, '回路の強化', englishId, [], 'medium'),
    [ieltsId]: createNode(ieltsId, 'IELTS勉強', englishId, [], 'medium'),

    // 技術力向上の子ノード
    [sqlId]: createNode(sqlId, 'SQL', techId),
    [genAiId]: createNode(genAiId, '生成AI', techId),
    [terraformId]: createNode(terraformId, 'Terraform', techId),
    [dataEngId]: createNode(dataEngId, 'データエンジニアリング', techId),
  },
  rootId,
  version: '1.0.0',
};
