export default function ChatPanel() {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800">
        <h2 className="font-semibold text-white text-base">Group Chat</h2>
        <p className="text-xs text-slate-400 mt-1">Collaborate with your team</p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-slate-900">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400">No messages yet</p>
          <p className="text-xs text-slate-500 mt-2">Start a conversation with your team</p>
        </div>
      </div>

      <div className="p-6 border-t border-slate-700 bg-slate-800">
        <div className="flex gap-3">
          <input
            className="flex-1 bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded outline-none focus:border-slate-500 transition-all placeholder-slate-400 text-sm"
            placeholder="Type a message..."
          />
          <button className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-4 py-3 rounded transition-colors duration-200 flex items-center justify-center shadow-lg shadow-green-600/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
