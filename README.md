# 🎯 Mindmap TODO

A visually engaging, tree-based task management app that lets you infinitely decompose your goals into actionable subtasks. Built with React Flow, this mindmap-style interface makes crushing your todos fun and intuitive.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://mitsumizo.github.io/mindmap-todo/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **📊 Mindmap Visualization**: Interactive tree-based layout powered by React Flow and Dagre
- **✅ Task Completion**: Check off tasks with visual feedback and completion badges
- **🔽 Collapsible Nodes**: Expand/collapse branches to focus on what matters
- **➕ Dynamic Node Addition**: Add subtasks on the fly with a single click
- **✏️ Inline Editing**: Rename tasks directly in the mindmap
- **🗑️ Recursive Deletion**: Remove tasks and their subtasks with confirmation
- **💾 Auto-Save**: Persistent data storage via localStorage
- **🎨 Beautiful UI**: Gradient backgrounds, smooth animations, and hover effects
- **📱 Responsive Layout**: Works seamlessly across different screen sizes

## 🚀 Live Demo

[**View Live App →**](https://mitsumizo.github.io/mindmap-todo/)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript 5
- **Visualization**: React Flow (@xyflow/react) v12
- **Layout Engine**: Dagre (automatic tree layout)
- **State Management**: Zustand v5
- **Styling**: Tailwind CSS v4 with custom gradients
- **Build Tool**: Vite 7
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mitsumizo/mindmap-todo.git
cd mindmap-todo

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## 🎮 Usage

1. **Complete Tasks**: Click the checkbox to mark tasks as done
2. **Add Subtasks**: Click the "+ 追加" (Add) button on any node
3. **Edit Tasks**: Click the "✏️ 編集" (Edit) button to rename
4. **Delete Tasks**: Click the "🗑️ 削除" (Delete) button to remove
5. **Expand/Collapse**: Use the ▼/▶ button to show/hide child tasks
6. **Navigate**: Zoom, pan, and use the minimap to explore your task tree

All changes are automatically saved to your browser's localStorage.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── nodes/
│   │   └── TodoNode.tsx       # Custom node component with CRUD operations
│   └── MindmapCanvas.tsx      # Main React Flow canvas
├── data/
│   └── initialTree.ts         # Type definitions and initial data
├── store/
│   └── todoStore.ts           # Zustand state management
├── utils/
│   ├── layout.ts              # Dagre layout engine with dynamic spacing
│   └── treeToFlow.ts          # Tree → React Flow conversion
├── App.tsx                    # Root component
└── main.tsx                   # Entry point
```

## 🎨 Key Technical Highlights

### Dynamic Layout Algorithm
The app uses an intelligent layout system that adjusts node spacing based on tree structure:
- Calculates sibling counts at each level
- Dynamically adjusts horizontal spacing to prevent overlap
- Scales vertical spacing based on total node count

### State Management
Zustand provides a clean, minimal state management solution:
- Automatic localStorage persistence
- Optimized re-renders with selector pattern
- Type-safe state updates

### Custom Node Components
React Flow's custom node system enables:
- Rich interactive UI with multiple action buttons
- Conditional styling based on completion state
- Type-safe data passing from tree structure to UI

### Visual Polish
- Gradient backgrounds and shadows for depth
- Smooth CSS transitions for all interactions
- Animated edges connecting related tasks
- Completion badges with bounce animation

## 🔨 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The project is configured for automatic deployment to GitHub Pages via GitHub Actions. Every push to `main` triggers a build and deploy workflow.

## 📄 License

MIT License - feel free to use this project for your own portfolio or learning purposes.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the powerful graph visualization library
- [Dagre](https://github.com/dagrejs/dagre) for automatic graph layout
- [Zustand](https://github.com/pmndrs/zustand) for elegant state management

---

**Built with ❤️ using React, TypeScript, and React Flow**
