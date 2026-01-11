# Mindmap TODO - プロジェクト固有指示

## 📌 プロジェクト概要
マインドマップ型のTODOアプリ。目標を中心に無限に分解できるツリー構造で、タスクを楽しく潰していける体験を提供する。

## 🎯 開発方針

### コアコンセプト
- **「潰すのが楽しくなっちゃう」体験**
- ビジュアル重視のマインドマップUI
- 直感的な操作性

### 技術選定理由
- **React Flow**: マインドマップUIに最適
- **TypeScript**: 型安全性とメンテナンス性
- **localStorage**: MVPに必要十分なデータ永続化
- **Vite**: 高速な開発体験

## 📊 現在の進捗状況

### ✅ セットアップ完了（2026-01-11）

**環境構築**
- ✅ Vite + React 18 + TypeScript 5
- ✅ React Flow (`@xyflow/react`) v12
- ✅ Zustand v5 (状態管理)
- ✅ uuid v11 (ID生成)
- ✅ Tailwind CSS v4 + `@tailwindcss/postcss`
- ✅ 開発サーバー起動確認済み (http://localhost:5173/)

**実装済みファイル**
- ✅ `src/types/todo.ts` - TodoNode, TodoTree型定義
- ✅ `src/data/initialTree.ts` - 初期データ（21ノード）
- ✅ `src/store/todoStore.ts` - Zustand状態管理
  - toggleComplete, toggleCollapse
  - addNode, updateNode, deleteNode
  - localStorage連携（loadFromStorage, saveToStorage）
- ✅ `src/App.tsx` - 基本的なセットアップ確認画面
- ✅ `src/index.css` - Tailwind CSS v4設定
- ✅ `postcss.config.js` - PostCSS設定

**ディレクトリ構造**
```
src/
├── components/nodes/  (空 - カスタムノード用)
├── hooks/            (空 - カスタムフック用)
├── store/
│   └── todoStore.ts  ✅
├── types/
│   └── todo.ts       ✅
├── data/
│   └── initialTree.ts ✅
├── utils/            (空 - ユーティリティ用)
├── App.tsx           ✅
├── main.tsx          ✅
└── index.css         ✅
```

### 🎯 次の実装ステップ

**Phase 1: マインドマップ表示**
- [ ] React Flowキャンバスコンポーネント作成
- [ ] ツリーデータをReact Flow形式に変換
- [ ] 基本的なノード配置とエッジ表示

**Phase 2: カスタムノード**
- [ ] チェックボックス付きノードコンポーネント
- [ ] 展開/折りたたみボタン
- [ ] ノード追加ボタン

**Phase 3: インタラクション**
- [ ] チェック機能の実装
- [ ] 展開/折りたたみ機能
- [ ] ノード追加機能

**Phase 4: 仕上げ**
- [ ] スタイリング（楽しい見た目）
- [ ] アニメーション
- [ ] localStorage自動保存確認

## 🔧 実装時の注意事項

### Tailwind CSS v4 の注意点
- **postcss.config.js**: `@tailwindcss/postcss` を使用（v3の `tailwindcss` は使えない）
- **src/index.css**: `@import "tailwindcss";` 形式（`@tailwind` ディレクティブは使えない）
- **tailwind.config.js**: v4では不要（削除済み）

### React Flow の使用
- ノードコンポーネントはカスタマイズ可能
- エッジ（線）のスタイルも調整する
- ズーム・パン機能は標準で使用可能
- レイアウトアルゴリズムは`dagre`や手動配置を検討

### データ構造
- ツリー構造は親子関係で管理
- IDはuuid等でユニーク性を保証
- localStorageは自動保存（debounce推奨）

### UI/UX
- 完了時のアニメーション実装
- ノード追加は直感的なボタン配置
- チェックボックスは大きめで押しやすく
- 色使いは明るく親しみやすい配色

### コーディング規約
- コンポーネントは機能単位で分割
- hooks は custom hooks として抽出
- 型定義は `types/` ディレクトリに集約
- テストは実際の機能を検証（意味のないアサーション禁止）

## 📂 推奨ディレクトリ構成

```
mindmap-todo/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── nodes/          # React Flow カスタムノード
│   │   ├── MindmapCanvas.tsx
│   │   └── ...
│   ├── hooks/              # カスタムフック
│   │   ├── useLocalStorage.ts
│   │   └── useTodoTree.ts
│   ├── store/              # 状態管理（Zustand等）
│   │   └── todoStore.ts
│   ├── types/              # TypeScript型定義
│   │   └── todo.ts
│   ├── utils/              # ユーティリティ関数
│   │   └── storage.ts
│   ├── data/               # 初期データ
│   │   └── initialTree.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── REQUIREMENTS.md         # 要件定義書
├── package.json
└── vite.config.ts
```

## 🎨 初期データ

プロジェクトの初期データとして、以下のツリー構造を実装する：

**ルート**: "30歳までにグローバルで働く"

**カテゴリ1**: 転職活動の土台
- LinkedIn更新
- GitHub整理
- ポートフォリオ作成
- CV整理

**カテゴリ2**: 面接突破
- 面接準備
- アルゴリズム勉強

**カテゴリ3**: 英語力向上
- 単語力
- 回路の強化
- IELTS勉強

**カテゴリ4**: 技術力向上
- SQL
- 生成AI
- Terraform
- データエンジニアリング

## ✅ MVP完了条件

1. 上記の初期データがマインドマップ表示される
2. ノードの展開/折りたたみができる
3. チェックボックスで完了管理ができる
4. ノード追加機能が動作する
5. localStorageでデータが永続化される
6. 見た目が楽しい

## 🚫 やらないこと（MVP段階）

- マルチユーザー対応
- 認証・ログイン
- クラウド同期
- モバイルアプリ
- ノード編集・削除（Phase 2以降）
- 複雑なアニメーション（基本的なもののみ）

## 📝 コミット規約

小刻みに意味のある単位でコミットすること：

- `feat:` 新機能追加
- `fix:` バグ修正
- `style:` スタイリング変更
- `refactor:` リファクタリング
- `chore:` 環境設定等

例:
```
feat: React Flowでツリー表示の基本実装
feat: ノード展開/折りたたみ機能追加
feat: localStorage連携実装
```

## 🔄 開発フロー

1. 要件確認（REQUIREMENTS.md参照）
2. 実装
3. 動作確認
4. コミット（小刻みに）
5. 次の機能へ

## 💡 参考リンク

- [React Flow公式ドキュメント](https://reactflow.dev/learn)
- [React Flow Examples](https://reactflow.dev/examples)

---

**作成日**: 2026-01-11
**最終更新**: 2026-01-11 21:45 JST
**ステータス**: セットアップ完了 → React Flow実装準備中
