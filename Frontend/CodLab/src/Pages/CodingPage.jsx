import ChatPanel from "../Components/ChatPanel";
import CompilerPanel from "../Components/ComplierPanel";

export default function CodingPage() {
  return (
    <div className="h-screen flex bg-slate-900 text-white overflow-hidden">
      {/* Chat Panel */}
      <div className="w-1/4 border-r border-slate-700 bg-slate-900 flex-shrink-0">
        <ChatPanel />
      </div>

      {/* Compiler Panel */}
      <div className="flex-1 min-w-0 flex flex-col bg-slate-900">
        <CompilerPanel />
      </div>
    </div>
  );
}
