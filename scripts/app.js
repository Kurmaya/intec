gsap.registerPlugin(ScrollTrigger);
const video = document.getElementById("video");
const videoCtx = video.getContext('2d');

const content = document.querySelector("#hero .content").children;


video.height=screen.height;
video.width=screen.width;
// video.height= 864;
// video.width= 1536;
// video.width = 1100;
// video.height = 600;
const videoInfo = {
    totalFrames: 108,
    totalTime: 5,
    images:[],
    currentFrame: 0,
    currentImage : (index) =>
         `./assets/hero-images/hero-images/ezgif-frame-${index.toString().padStart(3,'0')}.jpg`,
        //  `assets\hero-images\ezgif-7-1c0c5c0e67-jpg\ezgif-frame-001.jpg`   
};
let hRatio,vRatio,ratio,imageHeight,imageWidth;


for(let i=0;i<=videoInfo.totalFrames;i++){
    const img = new Image();
    img.src= videoInfo.currentImage(i);
    videoInfo.images.push(img);
    
}

// console.log(videoInfo.currentImage(10));


console.log(videoInfo.images);
gsap.to(videoInfo,{
    currentFrame:videoInfo.totalFrames,
    scrollTrigger:{
        trigger: video,
        markers:true,
        // pin:true,
        // pinSpacing:false,
        start: 'top 5%',
        end:`bottom+=${videoInfo.totalFrames*videoInfo.totalTime}`,
        scrub:.2,    
    },
    snap:'currentFrame',
    onUpdate: render,  
    
})



videoInfo.images[0].onload =() => render();


function render(){
    imageWidth = videoInfo.images[videoInfo.currentFrame].width;
imageHeight = videoInfo.images[videoInfo.currentFrame].height;
hRatio = video.width/ imageWidth;
vRatio = video.height/ imageHeight;
ratio = Math.min(hRatio/vRatio);
var centerShift_x = (video.width - imageWidth*ratio)/2;
var centerShift_y = (video.height - imageHeight*ratio)/2;
// videoCtx.scale(1.5,1.5);
    videoCtx.drawImage(
        videoInfo.images[videoInfo.currentFrame],0,0,imageWidth,imageHeight,centerShift_x,centerShift_y,imageWidth*ratio,imageHeight*ratio
    );
    
}
render();

//content animations
const tl = gsap.timeline({
    scrollTrigger:{
        trigger:'#hero .content',
        start:'bottom 25%',
        markers:true,
        scrub:true,
        end:'bottom -20%',
        ease:'power1'
    }
});

tl.from(content[0],{
    opacity:0,
    x:-20,
})
tl.from(content[1],{
    opacity:0,
    x:-20,
})

//second section animations
const gridCards = document.querySelectorAll(".grid-items");
let tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:'#second',
        start:'top 60%',
        markers:true,
        end:'center center',
        ease:'none',
        // scrub:true,
    }
})
tl2.from("#second h1",{
    xPercent:-200,
    opacity:0,
})
tl2.from(".grid-item",{
    xPercent:-500,
    stagger:.1,
    
})
//third section animations

let tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:'#third',
        start:'top 50%',
        end: 'top 20%',
        scrub:true,
        markers:true,
        ease:'power1'
    }
})
tl2.from("#third h1",{
    xPercent:-200,
    
    
})
tl3.from('#third .img-holder',{
    scale:0.4,
    rotateY:'45deg',
})

//navbar scale
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    // document.querySelector(".navbar").style.height = "100%";
    document.querySelector(".logo").style.width = "125px";
    document.querySelector(".logo").style.height = "60px";
    // document.querySelector(".logo").classList.add(".scrolled")
  } else {
    // document.querySelector(".navbar").style.height = "70px";
    // document.querySelector(".logo").classList.remove(".scrolled")
    document.querySelector(".logo").style.width = "150px";
    document.querySelector(".logo").style.height = "80px";
  }
}