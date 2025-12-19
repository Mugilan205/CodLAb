import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import CodeEditor from "./CodeEditor";
import IOSection from "./IOSection";

const LANGUAGE_TEMPLATES = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
  python: `def main():
    print("Hello World")

if __name__ == "__main__":
    main()`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  javascript: `function main() {
    console.log("Hello World");
}

main();`
};

export default function CompilerPanel() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.cpp);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleResetToDefault = () => {
    setCode(LANGUAGE_TEMPLATES[language] || "");
  };

  // Update code template when language changes
  useEffect(() => {
    setCode(LANGUAGE_TEMPLATES[language] || "");
  }, [language]);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-900">
      <TopBar 
        language={language} 
        onLanguageChange={handleLanguageChange}
        onResetToDefault={handleResetToDefault}
      />

      {/* Editor must expand */}
      <div className="flex-1 min-h-0 overflow-hidden w-full" style={{ position: 'relative' }}>
        <CodeEditor language={language} code={code} onCodeChange={setCode} />
      </div>

      {/* Fixed height I/O */}
      <div className="flex-shrink-0">
        <IOSection />
      </div>
    </div>
  );
}
}
