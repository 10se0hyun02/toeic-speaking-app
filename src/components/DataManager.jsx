import { useRef } from 'react'

export default function DataManager({ onExport, onImport }) {
  const fileRef = useRef(null)

  function handleExport() {
    const json = onExport()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `toeic-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const ok = onImport(ev.target.result)
      if (!ok) alert('Invalid file format.')
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      >
        Export
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      >
        Import
      </button>
      <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
    </div>
  )
}
