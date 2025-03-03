const StatusBar = () => {
  return (
    <div className="flex justify-between items-center mb-6 text-xs text-gray-400">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <div className="h-2.5 w-2.5 rounded-full bg-gold-900" />
        <div className="h-2.5 w-2.5 rounded-full bg-gold-900" />
        <div className="h-2.5 w-2.5 rounded-full bg-gold-900" />
      </div>
    </div>
  );
};

export default StatusBar;
