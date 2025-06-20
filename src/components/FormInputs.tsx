export const NumberInput = ({ label, value, onChange, lightTheme }: any) => (
  <div>
    <label className={`block text-sm mb-1 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={`w-full rounded px-2 py-1 border outline-none 
        ${lightTheme 
          ? 'bg-white text-black border-gray-300 focus:ring-blue-400' 
          : 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'}`}
    />
  </div>
);

export const RangeInput = ({ label, value, onChange, step = 0.1, min = 0, max = 1, lightTheme }: any) => (
  <div>
    <label className={`block text-sm mb-1 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>{label}: {value}</label>
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

export const ColorInput = ({ label, value, onChange, lightTheme }: any) => (
  <div>
    <label className={`block text-sm mb-1 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>{label}</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-8 p-0 border-none bg-transparent"
    />
  </div>
);

export const TextInput = ({ label, value, onChange, placeholder = '', lightTheme }: any) => (
  <div>
    <label className={`block text-sm mb-1 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded px-2 py-1 border outline-none 
        ${lightTheme 
          ? 'bg-white text-black border-gray-300 focus:ring-blue-400' 
          : 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'}`}
    />
  </div>
);

export const SelectInput = ({ label, value, onChange, options, lightTheme }: any) => (
  <div>
    <label className={`block text-sm mb-1 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded px-2 py-1 border outline-none 
        ${lightTheme 
          ? 'bg-white text-black border-gray-300 focus:ring-blue-400' 
          : 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'}`}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
