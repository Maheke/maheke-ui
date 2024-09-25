import TransactionBuilderError from "@/lib/errors/TransactionBuilderError";
import {
  Asset,
  BASE_FEE,
  Claimant,
  Operation,
  Server,
  TransactionBuilder,
} from "stellar-sdk";

const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);

export async function createFeePaymentClaimableBalance(
  publicKey: string
): Promise<string> {
  try {
    await server.loadAccount(import.meta.env.VITE_PROPOSAL_MICROPAYMENT_SENDER);

    const sourceAccount = await server.loadAccount(publicKey);
    const claimants = [
      new Claimant(
        import.meta.env.VITE_PROPOSAL_MICROPAYMENT_SENDER,
        Claimant.predicateUnconditional()
      ),
      new Claimant(
        publicKey,
        Claimant.predicateNot(Claimant.predicateBeforeRelativeTime("300"))
      ),
    ];

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE,
    })
      .addOperation(
        Operation.createClaimableBalance({
          asset: Asset.native(),
          amount: "5",
          claimants: claimants,
        })
      )
      .setTimeout(180)
      .build();
    return transaction.toXDR();
  } catch (err) {
    throw new TransactionBuilderError();
  }
}

export async function lockAccount() {
  const publicKey = import.meta.env.VITE_MAHEKE_ESCROW_PUBLIC;
  const account = await server.loadAccount(publicKey);

  const transaction = new TransactionBuilder(account, {
    networkPassphrase: import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE,
    fee: (await server.fetchBaseFee()).toString(),
  })
    .addOperation(
      Operation.setOptions({
        source: publicKey,
        masterWeight: 0,
      })
    )
    .setTimeout(300)
    .build();

  return transaction.toXDR();
}
