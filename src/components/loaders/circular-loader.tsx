const CircularLoader = () => {
  return (
    <div className="relative">
    <div className="w-7 h-7 border-white border-4 rounded-full"></div>
    <div className="w-7 h-7 border-lime-900 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
</div>
  );
};

export default CircularLoader;