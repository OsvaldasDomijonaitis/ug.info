export function VideoMuted() {
  return (
    <video className="h-full w-full rounded-lg" controls autoPlay muted>
      <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoMuted;