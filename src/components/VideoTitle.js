const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute z-30 text-white
        left-4 sm:left-8 md:left-12 lg:left-16
        bottom-[30%] sm:bottom-[30%]"
    >
      <h1 className="font-black leading-tight mb-2 sm:mb-3 drop-shadow-2xl
        text-2xl sm:text-4xl md:text-5xl lg:text-6xl
        max-w-[280px] sm:max-w-sm md:max-w-lg">
        {title}
      </h1>

      <p className="hidden sm:block text-gray-200 mb-4 leading-relaxed
        text-xs sm:text-sm md:text-base line-clamp-3
        max-w-xs sm:max-w-sm md:max-w-md">
        {overview}
      </p>

      <div className="flex gap-2 sm:gap-3">
        <button className="flex items-center gap-1 sm:gap-2 font-bold rounded
          bg-white text-black hover:bg-white/80 active:scale-95
          transition-all duration-150
          px-4 py-2 sm:px-8 sm:py-3 text-xs sm:text-base">
          ▶ Play
        </button>
        <button className="flex items-center gap-1 sm:gap-2 font-semibold rounded
          bg-gray-500/70 text-white hover:bg-gray-400/60 active:scale-95
          transition-all duration-150 backdrop-blur-sm
          px-4 py-2 sm:px-8 sm:py-3 text-xs sm:text-base">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;