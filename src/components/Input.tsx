type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
};

export default function Input({ type = "text", placeholder, value, onChange, helperText }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-orange-600`}
      />
      {helperText && <p className="mt-1 text-sm font-semibold text-red-600">{helperText}</p>}
    </div>
  );
}
