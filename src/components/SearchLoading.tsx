export default function SearchLoading() {
  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center transition-all z-20">
      <div className="animate-spin border-4 border-slate-200 border-t-mist-500 h-10 w-10 rounded-full" />
    </div>
  );
}
