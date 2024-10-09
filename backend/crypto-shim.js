import crypto from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = {};
}

if (!globalThis.crypto.subtle) {
  globalThis.crypto.subtle = {
    digest: async (algorithm, data) => {
      return new Promise((resolve, reject) => {
        try {
          const hash = crypto.createHash(algorithm.toLowerCase().replace('-', ''));
          hash.update(data);
          resolve(hash.digest());
        } catch (error) {
          reject(error);
        }
      });
    }
  };
}

if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = function(buffer) {
    let typedArray;
    
    if (buffer instanceof Uint8Array) {
      typedArray = buffer;
    } else if (ArrayBuffer.isView(buffer)) {
      typedArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else if (buffer instanceof ArrayBuffer) {
      typedArray = new Uint8Array(buffer);
    } else {
      throw new TypeError('Expected ArrayBuffer or ArrayBufferView');
    }

    if (typedArray.length > 65536) {
      throw new Error('Can only generate up to 65536 random bytes');
    }

    const randomBytes = crypto.randomBytes(typedArray.length);
    typedArray.set(new Uint8Array(randomBytes.buffer, randomBytes.byteOffset, randomBytes.byteLength));
    
    return buffer;
  };
}

export default globalThis.crypto;