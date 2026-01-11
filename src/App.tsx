import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { MindmapCanvas } from './components/MindmapCanvas';

function App() {
  const loadFromStorage = useTodoStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="w-full h-full p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full h-full overflow-hidden border-4 border-purple-200">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 px-8 py-5 relative overflow-hidden">
            {/* 背景の装飾 */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-2 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-2 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl animate-bounce">🎯</span>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  Mindmap TODO
                </h1>
              </div>
              <p className="text-purple-100 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✨</span>
                目標を無限に分解できるツリー型TODOアプリ
                <span className="text-lg">🚀</span>
              </p>
            </div>
          </div>

          {/* メインキャンバス */}
          <div className="w-full" style={{ height: 'calc(100% - 96px)' }}>
            <MindmapCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
