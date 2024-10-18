const registerVideo = (bound, video) => {
	bound = document.querySelector(bound);
	video = document.querySelector(video);
	const scrollVideo = ()=>{
		if(video.duration) {
			const distanceFromTop = window.scrollY + bound.getBoundingClientRect().top;
			const rawPercentScrolled = (window.scrollY - distanceFromTop) / (bound.scrollHeight - window.innerHeight);
			const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
			
			video.currentTime = video.duration * percentScrolled;
		}
		requestAnimationFrame(scrollVideo);
	}
	requestAnimationFrame(scrollVideo);
}


registerVideo("#second", "#second video");

//another type starts here
      /**
        Low FPS + low keyframe interval + h.264 encoding = fask seeking:
        
        ffmpeg -i in.mp4 -vcodec libx264 -x264-params keyint=12:scenecut=0 \
          -filter:v fps=12 -an out.mp4
      */

    //   const scroller = document.querySelector("body");
    //   const video = document.querySelector("video");
    //   let seeked = false;

    //   let lastProgress = 0;
    //   const progressDelta = 0.1;

    //   function lerp(x, y, t) {
    //     return (1 - t) * x + t * y;
    //   }

    //   (function tick() {
    //     requestAnimationFrame(tick);
    //     if (!seeked) return;
    //     seeked = false;
    //     seeked = false;
    //     const { scrollHeight, clientHeight, scrollTop } = scroller;
    //     const maxScroll = scrollHeight - clientHeight;
    //     const scrollProgress = scrollTop / Math.max(maxScroll, 1);
    //     // Round to 2 decimal places
    //     const progress =
    //       Math.round(
    //         // Smoothly approach scroll progress instead of instantly
    //         lerp(lastProgress, scrollProgress, progressDelta) * 100
    //       ) / 100;
    //     video.currentTime = video.duration * progress;
    //     lastProgress = progress;
    //   })();

    //   video.addEventListener("seeked", () => {
    //     seeked = true;
    //   });
    //   video.currentTime = 0.001;
    //another type ends here