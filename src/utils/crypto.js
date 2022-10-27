import CryptoJS from 'crypto-js';

// des加密,isHex表示结果是否有密文,输出hex,否则输出base64
// key为加密的秘钥。message 为需要加密的信息
let encryptByDES = function (message, key, isHex = true) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  if (isHex) return encrypted.ciphertext.toString();
  else return encrypted.toString();
};

// DES 解密,isHex表示对hex解密,否则对base64解密
let decryptByDES = (ciphertext, key, isHex = true) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  if (isHex) ciphertext = CryptoJS.enc.Hex.parse(ciphertext);
  else ciphertext = CryptoJS.enc.Base64.parse(ciphertext);
  var decrypted = CryptoJS.DES.decrypt({ ciphertext }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { encryptByDES, decryptByDES };
