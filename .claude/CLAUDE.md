# Mindmap TODO - プロジェクト固有指示

## 📌 プロジェクト概要

マインドマップ型のTODOアプリ。目標を中心に無限に分解できるツリー構造で、タスクを楽しく潰していける体験を提供する。

**コアコンセプト**:
- 「潰すのが楽しくなっちゃう」体験
- ビジュアル重視のマインドマップUI
- 直感的な操作性

## 🎯 現在のステータス

**✅ MVP完了（2026-01-11）**

すべての主要機能が実装済み：
- ✅ マインドマップ表示（React Flow + dagre レイアウト）
- ✅ ノード操作（追加・編集・削除・完了・展開/折りたたみ）
- ✅ 優先順位管理（高・中・低の3段階 + 色分け表示）
- ✅ データ永続化（localStorage）
- ✅ GitHub Pagesデプロイ

**デモ**: https://mitsumizo.github.io/mindmap-todo/

## 📚 ドキュメント

詳細なドキュメントは以下を参照してください：

- **@docs/setup.md** - セットアップガイド、Tailwind CSS v4の注意点
- **@docs/architecture.md** - 技術選定理由、データ構造、ディレクトリ構成
- **@docs/development-log.md** - 開発履歴、実装済み機能の詳細
- **@docs/roadmap.md** - 今後のロードマップ、次の機能候補

## ⚡ クイックリファレンス

### 開発サーバー起動
```bash
npm run dev
# → http://localhost:5173/mindmap-todo/
```

### ビルド
```bash
npm run build
```

### 主要ファイル
- `src/components/nodes/TodoNode.tsx` - カスタムノードUI
- `src/components/MindmapCanvas.tsx` - マインドマップキャンバス
- `src/store/todoStore.ts` - Zustand状態管理
- `src/data/initialTree.ts` - 初期データ・型定義
- `src/utils/treeToFlow.ts` - ツリー→React Flow変換
- `src/hooks/useLayout.ts` - dagreレイアウト

## 🔧 重要な注意事項

### Tailwind CSS v4
⚠️ **v3から設定方法が大きく変更されています**

- `postcss.config.js` で `@tailwindcss/postcss` を使用
- `src/index.css` に `@import "tailwindcss";`
- `tailwind.config.js` は不要（削除済み）

詳細: @docs/setup.md

### コーディング規約
- コンポーネントは機能単位で分割
- Hooksは再利用可能な形で抽出（`use`プレフィックス）
- 型定義は `types/` または各ファイル内で定義
- テストは実際の機能を検証（意味のないアサーション禁止）

## 📝 コミット規約

小刻みに意味のある単位でコミットする：

- `feat:` 新機能追加
- `fix:` バグ修正
- `style:` スタイリング変更
- `refactor:` リファクタリング
- `docs:` ドキュメント更新
- `chore:` 環境設定等

**例**:
```
feat: 優先順位表示機能を追加
fix: ノード削除時の子孫削除バグを修正
docs: CLAUDE.mdを最新版に更新
```

## 🔄 開発フロー

1. 要件確認
2. 実装
3. 動作確認（ブラウザ + ビルド）
4. コミット（小刻みに）
5. プッシュ
6. 次の機能へ

## 🎯 次のステップ

次に実装する機能候補は @docs/roadmap.md を参照してください。

優先度の高い機能：
- フィルタリング・ソート機能
- カスタムタグ機能
- キーボードショートカット

---

**作成日**: 2026-01-11
**最終更新**: 2026-01-11 23:30 JST
**ステータス**: ✅ MVP完了
