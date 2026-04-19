type DividerLineProps = {
  className?: string;
};

export function DividerLine({ className = "" }: DividerLineProps) {
  return (
    <div className={`relative h-px w-full overflow-hidden bg-white/10 ${className}`}>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgba(201,162,74,0.75)] to-transparent" />
    </div>
  );
}
