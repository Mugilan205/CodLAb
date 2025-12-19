export default function OutputBox() {
  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="px-6 py-3 border-b border-slate-700 bg-slate-800">
        <h3 className="text-sm font-semibold text-white">Output</h3>
      </div>
      <pre className="flex-1 bg-slate-800 p-6 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap break-words border-none" style={{ lineHeight: '1.6' }}>
        <span className="text-slate-500">Output will appear here...</span>
      </pre>
    </div>
  );
}
