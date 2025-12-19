import Editor from "@monaco-editor/react";

const LANGUAGE_MAP = {
  cpp: "cpp",
  python: "python",
  java: "java",
  javascript: "javascript"
};

export default function CodeEditor({ language = "cpp", code, onCodeChange }) {
  const monacoLanguage = LANGUAGE_MAP[language] || "cpp";

  return (
    <div 
      className="flex-1 relative bg-slate-900 w-full h-full" 
      style={{ 
        minHeight: 0,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        theme="vs-dark"
        value={code}
        onChange={(value) => onCodeChange(value || "")}
        loading={<div className="text-white p-4 bg-slate-900">Loading editor...</div>}
        options={{
          readOnly: false,
          domReadOnly: false,
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
          fontLigatures: false,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          lineHeight: 22,
          letterSpacing: 0.5,
          selectOnLineNumbers: true,
          quickSuggestions: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: true,
          contextmenu: true,
          mouseWheelZoom: false,
          multiCursorModifier: "ctrlCmd",
        }}
      />
    </div>
  );
}
