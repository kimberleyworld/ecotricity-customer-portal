export default function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 mt-4 bg-[var(--eco-green)] text-gray-900 rounded-full hover:text-gray-400">
      {children}
    </button>
  );
}
