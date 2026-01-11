# アーキテクチャ

## 技術選定理由

### React Flow
- マインドマップUIに最適なライブラリ
- ノードのカスタマイズが容易
- ズーム・パン機能が標準搭載
- レイアウトアルゴリズム（dagre）との統合が簡単

### TypeScript
- 型安全性による早期エラー検出
- IDEのインテリセンス支援
- リファクタリングの安全性
- 大規模化に対応しやすい

### Zustand
- 軽量でシンプルな状態管理
- Reduxより学習コストが低い
- TypeScriptとの相性が良い
- ボイラープレートが少ない

### localStorage
- MVPに必要十分なデータ永続化
- サーバー不要で即座に動作
- 実装がシンプル
- 将来的にクラウド同期に移行可能

### Tailwind CSS v4
- ユーティリティファーストで高速開発
- v4では設定ファイル不要でシンプル
- カスタマイズ性が高い
- 一貫性のあるデザインシステム

## データ構造

### TodoNode
```typescript
interface TodoNode {
  id: string;                        // UUID
  label: string;                     // タスク名
  completed: boolean;                // 完了状態
  parentId: string | null;           // 親ノードID（ルートはnull）
  children: string[];                // 子ノードIDの配列
  collapsed: boolean;                // 折りたたみ状態
  createdAt: Date;                   // 作成日時
  completedAt?: Date;                // 完了日時（オプショナル）
  priority?: 'high' | 'medium' | 'low'; // 優先順位（オプショナル）
}
```

### TodoTree
```typescript
interface TodoTree {
  nodes: Record<string, TodoNode>;   // ノードIDをキーとしたマップ
  rootId: string;                    // ルートノードのID
  version: string;                   // データバージョン
}
```

### 設計の特徴

1. **フラットな構造**: ノードは `nodes` オブジェクトで管理（検索・更新が高速）
2. **親子関係**: `parentId` と `children` で双方向の関係を保持
3. **拡張性**: 将来的にタグやメモなどのフィールド追加が容易
4. **型安全**: TypeScriptで厳密な型定義

## ディレクトリ構成

```
mindmap-todo/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── nodes/          # React Flow カスタムノード
│   │   │   └── TodoNode.tsx
│   │   └── MindmapCanvas.tsx
│   ├── hooks/              # カスタムフック
│   │   └── useLayout.ts
│   ├── store/              # 状態管理（Zustand）
│   │   └── todoStore.ts
│   ├── types/              # TypeScript型定義
│   │   └── todo.ts
│   ├── utils/              # ユーティリティ関数
│   │   ├── treeToFlow.ts
│   │   └── layout.ts
│   ├── data/               # 初期データ
│   │   └── initialTree.ts
│   ├── App.tsx             # メインコンポーネント
│   ├── main.tsx            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── docs/                   # ドキュメント
├── public/                 # 静的ファイル
├── .claude/                # Claude Code設定
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 命名規則

- **コンポーネント**: PascalCase（例: `TodoNode.tsx`）
- **フック**: camelCaseで`use`プレフィックス（例: `useLayout.ts`）
- **ユーティリティ**: camelCase（例: `treeToFlow.ts`）
- **型定義**: PascalCase（例: `TodoNode`, `TodoTree`）
- **変数・関数**: camelCase

### ファイル配置の原則

- コンポーネントは機能単位で分割
- Hooksは再利用可能な形で抽出
- 型定義は `types/` に集約
- ビジネスロジックは `store/` または `utils/` に配置

## React Flowとの統合

### ノード変換
`utils/treeToFlow.ts` でツリー構造をReact Flow形式に変換：
- `TodoNode` → React Flow `Node`
- 親子関係 → React Flow `Edge`
- 折りたたみ状態を考慮した表示制御

### レイアウト
`dagre` ライブラリを使用して自動レイアウト：
- ツリー構造に最適化
- ノード間隔の自動調整
- 視覚的に分かりやすい配置

### カスタムノード
`components/nodes/TodoNode.tsx` で独自UIを実装：
- チェックボックス
- 展開/折りたたみボタン
- 優先順位バッジ
- 編集・削除・優先度設定ボタン

---

**最終更新**: 2026-01-11
