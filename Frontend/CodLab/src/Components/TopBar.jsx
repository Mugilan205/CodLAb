export default function TopBar({ language, onLanguageChange, onResetToDefault }) {
  const handleLanguageSelect = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800">
      <div className="flex items-center gap-4">
        <select 
          value={language}
          onChange={handleLanguageSelect}
          className="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer hover:border-slate-500 transition-colors focus:outline-none focus:border-slate-500"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
        <span className="text-xs text-slate-400 font-mono">Ctrl+Enter to run</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-6 py-2 rounded font-medium text-sm transition-all duration-200 text-white shadow-lg shadow-green-600/20">
          Run
        </button>
        <button 
          onClick={onResetToDefault}
          className="bg-slate-700 border border-slate-600 hover:border-slate-500 hover:bg-slate-600 active:bg-slate-500 px-4 py-2 rounded font-medium text-sm transition-all duration-200 text-slate-200 hover:text-white"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
