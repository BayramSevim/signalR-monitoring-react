import pako from 'pako';

// Tarayıcı ortamında ve Node.js ortamında farklı dönüşüm işlemleri
const hexToString = (hex) => {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  return new TextDecoder('utf-8').decode(bytes);
};

// Base64'ü çözümlerken performansı artırmak için Buffer kullanımı
const base64ToUint8Array = (base64) => {
  const binaryString =
    typeof window === 'undefined'
      ? Buffer.from(base64, 'base64').toString('binary') // Node.js
      : window.atob(base64); // Tarayıcı

  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

const decodeAndDecompressData = (compressedBase64Data) => {
  try {
    // 1. Base64'ü çözümle
    const binaryData = base64ToUint8Array(compressedBase64Data);

    // 2. Pako ile sıkıştırmayı kaldır (ungzip)
    const decompressedData = pako.ungzip(binaryData, { to: 'string' });

    // 3. JSON formatına çevir
    const jsonString = hexToString(decompressedData);
    const jsonData = JSON.parse(jsonString);

    // Çözümlenmiş JSON veriyi döndür
    return jsonData;
  } catch (error) {
    console.error('Veri çözümleme veya decompress işlemi başarısız:', error);
    return null;
  }
};

export default decodeAndDecompressData;
