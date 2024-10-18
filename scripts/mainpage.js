const section = document.getElementById("second"),
video = section.querySelector("video"),
playbackConst = 500;
video.pause();
// video.currentTime = 0.1;

const scroll = () =>{
    section.style.height = Math.floor(video.duration) * playbackConst + "px";
    const distance = window.scrollY - section.offsetTop;
    const total = section.clientHeight - window.innerHeight;

    let percentage = distance/Math.max(total,1);
    percentage = Math.max(0,percentage);
    percentage = Math.min(percentage,1);

    if(video.duration > 0){
        video.currentTime = video.duration * percentage;
        console.log(video.currentTime);
    }
};

scroll();
window.addEventListener("scroll",scroll);