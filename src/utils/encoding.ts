/*
toBinary and fromBinary are from the 
Mozilla Contributors and are licensed under CC-BY-SA 2.5.
Page: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
*/


/**
 * convert a Unicode string to a string in which
 * each 16-bit unit occupies only one byte
 * @param source String to be converted (may contain utf-16)
 */
function toBinary(source: string): string {
    const codeUnits = new Uint16Array(source.length);

    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = source.charCodeAt(i);
    }

    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

/**
 * convert a Unicode string with one byte per char
 * to an Unicode String with UTF-16 
 * From
 * @param binary: Previously converted value (from toBinary)
 */
function fromBinary(binary: string): string {
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

/**
 * encodes a Unicode string to base64 safely
 * @param source String to be converted (may contain utf-16)
 */
export function encode(source: string): string {
    return btoa(toBinary(source));
}

/**
 * decodes a base64 string to Unicode safely
 * @param source String to be converted
 */
export function decode(source: string): string {
    return fromBinary(atob(source));
}
