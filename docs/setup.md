# セットアップガイド

## 環境要件

- Node.js 18+
- npm または yarn

## 技術スタック

- **Vite** v7.3.1 - 高速な開発体験
- **React** 18 - UIフレームワーク
- **TypeScript** 5 - 型安全性とメンテナンス性
- **React Flow** (`@xyflow/react`) v12 - マインドマップUI
- **Zustand** v5 - 状態管理
- **uuid** v11 - ユニークID生成
- **Tailwind CSS** v4 + `@tailwindcss/postcss` - スタイリング
- **dagre** - ツリーレイアウトアルゴリズム

## 開発サーバー起動

```bash
npm install
npm run dev
```

アプリケーション: http://localhost:5173/mindmap-todo/

## ビルド

```bash
npm run build
```

## Tailwind CSS v4 の重要な注意点

### ⚠️ v3からの重要な変更点

Tailwind CSS v4は、v3から設定方法が大きく変更されています：

#### postcss.config.js
```javascript
// ✅ 正しい（v4）
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

// ❌ 間違い（v3の方法）
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### src/index.css
```css
/* ✅ 正しい（v4） */
@import "tailwindcss";

/* ❌ 間違い（v3の方法） */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 設定ファイル
- **v4では `tailwind.config.js` は不要** - 削除済み
- v3の設定ファイルがあると動作しない可能性がある

## トラブルシューティング

### Tailwindのスタイルが適用されない場合

1. `postcss.config.js` が正しい形式か確認
2. `src/index.css` に `@import "tailwindcss";` があるか確認
3. `tailwind.config.js` が存在しないか確認（v4では不要）
4. 開発サーバーを再起動

### ビルドエラーが発生する場合

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

---

**最終更新**: 2026-01-11
