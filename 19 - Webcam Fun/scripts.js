const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(err);
    })
}

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  console.log(width, height);

  return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
      let pixels = ctx.getImageData(0, 0, width, height);
      // negativeEffect(pixels);
      // redEffect(pixels);
      // greenChannelEffect(pixels);
      //rgbSplitEffect(pixels);
      // ghostEffect(pixels);
      ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');

  const link = document.createElement('img');
  link.src = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src=${data} />`;
  strip.insertBefore(link, strip.firstChild);
}

function negativeEffect(pixels){
  return walkOverPixels(pixels, (r, g, b, a) => [255 - r, 255 - g, 255 - b, a]);
}

function redEffect(pixels){
  return walkOverPixels(pixels, (r, g, b, a) => [r + 100, g - 50, b * 0.5, a]);
}

function greenChannelEffect(pixels){
  return walkOverPixels(pixels, (r, g, b, a) => [0, g, 0, a]);
}

function walkOverPixels(pixels, callback){
  for(let i = 0 ; i < pixels.data.length; i+=4){
    [
        pixels.data[i], pixels.data[i+1], pixels.data[i+2], pixels.data[i+3]
    ] = callback(
        pixels.data[i], pixels.data[i+1], pixels.data[i+2], pixels.data[i+3]
    )
  }
}

video.addEventListener('canplay', paintToCanvas);
getVideo();
