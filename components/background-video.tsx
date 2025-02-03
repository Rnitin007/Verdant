export function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video autoPlay loop muted className="absolute min-h-full min-w-full object-cover">
        <source src="/garden-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-background/70" />
    </div>
  )
}

