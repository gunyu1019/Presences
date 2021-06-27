const presence = new Presence({
  clientId: "856821738981687337"
});

let VideoMedia: MediaData = {
  duration: 0,
  currentTime: 0,
  paused: true,
  ended: false
}, playback: boolean;

type MediaData = {
  duration: number;
  currentTime: number;
  paused: boolean;
  ended: boolean;
  title?: string;
}

type iFrameData = {
  iframeVideo: {
    duration: number;
    currentTime: number;
    paused: boolean;
    ended: boolean;
    title?: string;
  };
}

presence.on("iFrameData", async (data: iFrameData) => {
  playback = (data.iframeVideo?.duration ) !== undefined;
  if (playback)
    VideoMedia = data.iframeVideo;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  }, {location} = window;
  if (location.pathname === "/Player/kollus/player.asp") {
    presenceData.details = document.querySelector("div.txt").textContent;
    if (VideoMedia.title !== undefined)
      presenceData.state = VideoMedia.title;

    const now = Date.now();
    presenceData.endTimestamp = Math.floor(now / 1000) + VideoMedia.duration - VideoMedia.currentTime;

    if (VideoMedia.paused) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "일시 정지";
    }else if (VideoMedia.ended) {
      presenceData.smallImageKey = "stop";
      presenceData.smallImageText = "시청 완료";
    }else {
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "수강 중";
    }
  } else if (location.pathname === "/megastudy.asp")
    presenceData.details = "메인";
  else if (location.pathname.toLowerCase().indexOf("/entinfo") === 0)
    presenceData.details = "입시 정보";
  else if (location.pathname.toLowerCase().indexOf("/teacher") === 0)
    presenceData.details = "메가 선생님";
  presence.setActivity(presenceData);
});
