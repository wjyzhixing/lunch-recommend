export function dataURLtoFile(dataUrl: string, fileName: string) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

export function urlToBase64(url: string) {
  return new Promise<string>((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement('canvas');
      // canvas.width = this.naturalWidth;
      // canvas.height = this.naturalHeight;
      // 将图片插入画布并开始绘制
      canvas.getContext('2d')?.drawImage(image, 0, 0);
      // result
      let result = canvas.toDataURL('image/png');
      resolve(result);
    };
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute('crossOrigin', 'Anonymous');
    image.src = url;
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('转换失败'));
    };
  });
}
