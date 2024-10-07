


import { hexStringToUint8Array } from "./utils";
/**
 * @description validate frames signature packet with Farcaster Hub
 * @example
 * const res = await verifyFrameWithAistack(body, airstackKey);
 *
 * @param input.body The Frames Signature Packet
 * @param input.airstackKey The AIRSTACK API Key
 * @returns Whether the signed message is valid
 */
 
export const verifyFrameWithAistack = async (requestBody: any, airstackKey: string) => {
    if (!requestBody) {
        throw new Error("Tried to call validateFrameMessage with no frame action payload. You may be calling it incorrectly on the homeframe");
    }
    if (!airstackKey) {
        throw new Error("API Key is not provided.");
    }
    try {
        const validateMessageResponse = await fetch("https://hubs.airstack.xyz/v1/validateMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "x-airstack-hubs": airstackKey,
            },
            body: hexStringToUint8Array(requestBody.trustedData.messageBytes),
        });

		if (!validateMessageResponse.ok) {
			throw new Error(`Failed to validate message with Airstack Hub: ${await validateMessageResponse.text()}`);
		}

        const { valid } = await validateMessageResponse.json() as any;
        if (valid) {
            return {
                isValid: true
            };
        }
        else {
            return {
                isValid: false,
            };
        }
    }
    catch (e) {
        throw new Error(JSON.stringify(e));
    }
}