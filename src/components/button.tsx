interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  bgColor?: string; // optional background override
}

export default function Button({ onClick, children, disabled = false, bgColor }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1 mt-4 rounded-full text-gray-900 hover:text-gray-400 ${
        bgColor ? bgColor : "bg-[var(--eco-green)]"
      } ${disabled ? "cursor-not-allowed opacity-50 hover:text-gray-900" : ""}`}
    >
      {children}
    </button>
  );
}
