gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("video");
const videoCtx = video.getContext('2d');
const content = document.querySelector("#hero .content").children;
const video2 = document.getElementById("video2");
const video2Ctx = video2.getContext('2d');


video.height=screen.height;
video.width=screen.width;
video2.height=screen.height;
video2.width=screen.width;

const videoInfo = {
    totalFrames: 121,
    totalTime: 5,
    images:[],
    currentFrame: 0,
    currentImage : (index) =>
    `./assets/hero-images/printer/${index.toString().padStart(4,'0')}.jpg`,
};

const video2Info = {
    totalFrames: 138,
    totalTime: 5,
    images:[],
    currentFrame: 0,
    currentImage : (index) =>
    `./assets/hero-images/intop/${index.toString().padStart(4,'0')}.jpg`,
};
let hRatio,hRatio2,vRatio,vRatio2,ratio,ratio2,imageHeight,imageHeight2,imageWidth,imageWidth2;


for(let i=1;i<=videoInfo.totalFrames;i++){
    const img = new Image();
    img.src= videoInfo.currentImage(i);
    videoInfo.images.push(img);
    
}
for(let i=1;i<video2Info.totalFrames;i++){
    const img = new Image();
    img.src=video2Info.currentImage(i);
    video2Info.images.push(img);
}
// console.log(videoInfo.currentImage(10));


// console.log(videoInfo.images);
// console.log(video2Info.images);

//prefunction
gsap.to(videoInfo,{
    currentFrame:videoInfo.totalFrames,
    scrollTrigger:{
        trigger: video,
        markers:true,
        // pin:true,
        // pinSpacing:false,
        start: 'top 5%',
        end:`bottom+=${(videoInfo.totalFrames*videoInfo.totalTime/5.5)}`,
        scrub:.2,    
    },
    snap:'currentFrame',
    onUpdate: render,  
    
})

gsap.to(video2Info,{
    currentFrame:video2Info.totalFrames,
    scrollTrigger:{
        trigger: video2,
        markers:true,
        pin:true,
        // pinSpacing:false,
        start: 'top 5%',
        end:`bottom+=${video2Info.totalFrames*video2Info.totalTime}`,
        scrub:.2,    
    },
    snap:'currentFrame',
    onUpdate: render2,  
    
})



videoInfo.images[0].onload =() => render();
// video2Info.images[0].onload= () => render2();

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
function render2(){
    imageWidth2 = video2Info.images[video2Info.currentFrame].width;
imageHeight2 = video2Info.images[video2Info.currentFrame].height;
hRatio2 = video2.width/ imageWidth2;
vRatio2 = video2.height/ imageHeight2;
ratio2 = Math.min(hRatio2/vRatio2);
var centerShift_x = (video2.width - imageWidth2*ratio2)/2;
var centerShift_y = (video2.height - imageHeight2*ratio2)/2;
    video2Ctx.drawImage(
        video2Info.images[video2Info.currentFrame],0,0,imageWidth2,imageHeight2,centerShift_x,centerShift_y,imageWidth2*ratio2,imageHeight2*ratio2
    );
    
}


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
        start:'top 70%',
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
        start:'top 70%',
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