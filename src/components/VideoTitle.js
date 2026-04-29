const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute z-30 text-white"
      style={{ bottom: "22%", left: "4%", maxWidth: "min(45%, 600px)" }}
    >
      <h1 className="font-bold mb-2 drop-shadow-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-gray-300 mb-4 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm">
        {overview}
      </p>
      <div className="flex gap-2 sm:gap-3">
        <button className="bg-white text-black font-bold rounded hover:bg-gray-200 px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm flex items-center gap-1">
          ▶ Play
        </button>
        <button className="bg-gray-500/60 text-white rounded hover:bg-gray-500/80 px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm flex items-center gap-1">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;