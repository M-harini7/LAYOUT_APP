
export const NumberInput = ({ label, value, onChange }: any) => (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full border p-1"
      />
    </div>
  );
  
  export const RangeInput = ({ label, value, onChange, step = 0.1, min = 0, max = 1 }: any) => (
    <div>
      <label className="block text-sm">{label}: {value}</label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        step={step}
        min={min}
        max={max}
        className="w-full"
      />
    </div>
  );
  
  export const ColorInput = ({ label, value, onChange }: any) => (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 p-0 border-none"
      />
    </div>
  );
  
  export const TextInput = ({ label, value, onChange, placeholder = '' }: any) => (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-1"
      />
    </div>
  );
  
  export const SelectInput = ({ label, value, onChange, options }: any) => (
    <div>
      <label className="block text-sm">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border p-1">
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
  