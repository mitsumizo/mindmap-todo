import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { MindmapCanvas } from './components/MindmapCanvas';

function App() {
  const loadFromStorage = useTodoStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full h-full p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full h-full overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              🎯 Mindmap TODO
            </h1>
            <p className="text-purple-100 text-sm">
              目標を無限に分解できるツリー型TODOアプリ
            </p>
          </div>

          {/* メインキャンバス */}
          <div className="w-full" style={{ height: 'calc(100% - 80px)' }}>
            <MindmapCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
