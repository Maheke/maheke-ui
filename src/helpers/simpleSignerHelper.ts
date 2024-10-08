import { publicKey, xdr } from "@/lib/store/store";
import { StrKey } from "stellar-sdk";

const simpleSignerHost = import.meta.env.VITE_HOST_SIMPLE_SIGNER;
export function openConnectWindow(wallets?: string[]) {
  const connectWindow = window.open(
    `${simpleSignerHost}/connect`,
    "Connect_Window",
    "width=280, height=350"
  );

  let array: string[] = [];
  if (wallets) {
    array = wallets;
  }

  window.addEventListener("message", (e) => {
    if (e.origin !== simpleSignerHost) {
      return;
    } else if (connectWindow && e.data.type === "onReady") {
      connectWindow.postMessage({ wallets: array }, simpleSignerHost);
    }
  });

  return connectWindow;
}

export async function openSignWindow(xdr: string) {
  const signWindow = window.open(
    `${simpleSignerHost}/sign`,
    "Sign_Window",
    "width=450, height=350"
  );

  window.addEventListener("message", (e) => {
    if (e.origin !== simpleSignerHost) {
      return;
    } else if (signWindow && e.data.type === "onReady") {
      signWindow.postMessage({ xdr }, simpleSignerHost);
    }
  });

  return signWindow;
}

export function handleSimpleSignerMessage(e: MessageEvent) {
  if (
    e.origin !== window.origin &&
    e.origin !== import.meta.env.VITE_HOST_SIMPLE_SIGNER
  ) {
    return;
  }
  const messageEvent = e.data;

  if (messageEvent.type === "onConnect") {
    const publicKeyEvent = messageEvent.message.publicKey;
    if (StrKey.isValidEd25519PublicKey(publicKeyEvent)) {
      publicKey.set(publicKeyEvent);
    }
  }

  if (messageEvent.type === "onSign") {
    const signedXdr = messageEvent.message.signedXDR;
    if (signedXdr) {
      xdr.set(signedXdr);
    }
  }
}
