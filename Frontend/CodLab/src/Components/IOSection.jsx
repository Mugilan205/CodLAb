import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

export default function IOSection() {
  return (
    <div className="grid grid-cols-2 border-t border-slate-700 bg-slate-900 h-80 divide-x divide-slate-700">
      <InputBox />
      <OutputBox />
    </div>
  );
}
