const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video") !== null) {
    const video: HTMLVideoElement = document.querySelector("video"),
      title = document.querySelector("title").textContent;

    if (video !== undefined && !isNaN(video?.duration)) {
      iframe.send({
        iframeVideo: {
          currentTime: video?.currentTime,
          duration: video?.duration,
          paused: video?.paused,
          ended: video?.ended,
          title
        }
      });
    }
  }
});
