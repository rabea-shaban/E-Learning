import ReactPlayer from "react-player";

const VideoPlayer = ({ url, onProgress, onEnded }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
      <div className="aspect-video">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          onProgress={onProgress}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
