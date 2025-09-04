export const Logo = () => {
  return (
    <div className="flex w-fit items-center gap-1 rounded-sm text-2xl font-black">
      <span className="flex items-center text-purple-600">
        <span className="hidden text-amber-500 md:inline-block">Year</span>
        <img src="/icon.svg" alt="YearPlanner Logo" className="h-5 w-5" />
        <span className="hidden md:inline-block">Planner</span>
      </span>
    </div>
  );
};
