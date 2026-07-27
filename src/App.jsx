import { useState } from 'react'
import { useToeicData } from './hooks/useToeicData'
import StudyTab from './pages/StudyTab'
import PracticeTab from './pages/PracticeTab'
import MockTestTab from './pages/MockTestTab'
import ExpressionsTab from './pages/ExpressionsTab'
import DataManager from './components/DataManager'

const TABS = [
  { id: 'study', label: '학습 자료' },
  { id: 'practice', label: '파트 연습' },
  { id: 'mocktest', label: '모의시험' },
  { id: 'expressions', label: '표현 모음' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('study')
  const data = useToeicData()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <span className="text-sm font-bold text-gray-800 tracking-tight">TOEIC Speaking</span>
            <DataManager onExport={data.exportData} onImport={data.importData} />
          </div>
          <div className="flex gap-1 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'study' && <StudyTab data={data} />}
        {activeTab === 'practice' && <PracticeTab data={data} />}
        {activeTab === 'mocktest' && <MockTestTab data={data} />}
        {activeTab === 'expressions' && <ExpressionsTab />}
      </main>
    </div>
  )
}
