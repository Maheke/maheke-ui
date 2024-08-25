/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_UI: string;
    readonly VITE_DESTINATION_PUBLICKEY: string;
    readonly VITE_HOST_SIMPLE_SIGNER: string;
    readonly VITE_PROPOSAL_MICROPAYMENT_SENDER: string;
    readonly VITE_SERVER_URL: string;
    readonly VITE_STELLAR_NETWORK: string;
    readonly VITE_STELLAR_NETWORK_PASSPHRASE: string;
    readonly VITE_HORIZON_URL: string;
    readonly VITE_MAHEKE_ESCROW_PUBLIC: string;
    readonly VITE_MAHEKE_ESCROW_SECRET: string;
    readonly VITE_MAHEKE_DISCORD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
