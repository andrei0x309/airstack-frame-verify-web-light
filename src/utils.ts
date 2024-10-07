export const hexStringToUint8Array = (hexString: string) => {
    hexString = hexString.replace(/^0x/, '');
    if(!hexString) {
        throw new Error(`Expected a hex string, got ${hexString}`);
    }
    if(!hexString.match(/^[0-9a-fA-F]+$/)) {
        throw new Error(`Expected a hex string, got ${hexString}`);
    }
    const matches = hexString.match(/.{1,2}/g);
    if(!matches) {
        throw new Error(`Expected a hex string, got ${hexString}`);
    }
    return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
}
