export default function InputBox() {
  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="px-6 py-3 border-b border-slate-700 bg-slate-800">
        <h3 className="text-sm font-semibold text-white">Input</h3>
      </div>
      <textarea
        className="flex-1 bg-slate-800 text-white p-6 outline-none resize-none font-mono text-sm placeholder-slate-400 focus:bg-slate-800 focus:border-none transition-colors border-none"
        placeholder="Enter your input here..."
        spellCheck={false}
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
