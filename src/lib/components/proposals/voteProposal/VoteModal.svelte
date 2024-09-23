<script lang="ts">
  import alertIcon from "@/assets/svg/alert-icon.svg";
  import infoIcon from "@/assets/svg/info-icon.svg";
  import XLMLogo from "@/assets/svg/stellar-xlm-black-logo.svg";
  import { openSignWindow } from "@/helpers/simpleSignerHelper";
  import { language } from "@/lib/components/language/languageStore";
  import type { IProposalVote } from "@/lib/components/proposals/IProposalVote";
  import SaveUser from "@/lib/helpers/SaveUser";
  import LocalStorage from "@/lib/storage/LocalStorage";
  import { publicKey, xdr } from "@/lib/store/store";
  import {
    calculateRemainingDays,
    checkInvalidInputMessage,
  } from "@/routes/voteProposal/voteProposalHelpers";
  import {
    isModalVisible,
    sendingVoteError,
    voteStatus,
    voteStore,
    votingError,
  } from "@/routes/voteProposal/voteStore";
  import "@lottiefiles/lottie-player";
  import BigNumber from "bignumber.js";
  import { Asset, Server, TransactionBuilder } from "stellar-sdk";
  import { xdr as stellarXdr } from "stellar-sdk";

  const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);
  const storage = new LocalStorage();
  const saveUser = new SaveUser(storage);
  let isAmountValid: boolean;
  let invalidInputMessage: string;
  let sendingVote = false;
  let operationHash: string;
  export let proposal: any;

  async function loadAvailableAssets(publicKey: string) {
    const accountBalance = (await server.loadAccount(publicKey)).balances[0]
      ?.balance;
    if (accountBalance) {
      $voteStore.xlmBalance = accountBalance;
    }
  }

  $: if (!$xdr) {
    $voteStatus = "SIGN VOTE";
    if ($votingError) {
      $voteStatus = "TRY SIGNING AGAIN";
    }
  } else if ($sendingVoteError) {
    $voteStatus = "VOTE SUBMISSION FAILED";
  } else if (sendingVote) {
    $voteStatus = "SENDING VOTE";
  } else {
    $voteStatus = "SEND VOTE";
  }
  async function handleSignVote() {
    if ($voteStore.amount) {
      $voteStore.amount = new BigNumber($voteStore.amount)
        .toFixed(7)
        .toString();
      const voteInfo: IProposalVote = {
        voter: $publicKey,
        option: { name: $voteStore.registeredVote },
        amount: new BigNumber($voteStore.amount),
        asset: {
          isNative: true,
          code: Asset.native().getCode(),
          issuer: "",
        },
      };
      const unsignedXdr = "";
      if (stellarXdr.TransactionEnvelope.validateXDR(unsignedXdr, "base64")) {
        openSignWindow(unsignedXdr);
      } else {
        $votingError = true;
      }
    }
  }

  async function handleSendVote() {
    sendingVote = true;
    const result = await server.submitTransaction(
      TransactionBuilder.fromXDR(
        $xdr,
        import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE
      )
    );
    if (result) {
      sendingVote = false;
      $voteStore.confirmedVote = !$voteStore.confirmedVote;
      operationHash = result.hash;
      saveUser.vote(proposal.id, $voteStore.registeredVote, $publicKey);
    } else {
      $sendingVoteError = true;
    }
  }

  async function handleMaxAssetsButton() {
    const BASE_FEE = await server.fetchBaseFee();
    const maxAssetsAvailable = new BigNumber($voteStore.xlmBalance).minus(
      BASE_FEE
    );
    $voteStore.amount = maxAssetsAvailable.toString();
  }

  function closeModal() {
    $isModalVisible = false;
  }

  $: $voteStore.remainingVotingDays = calculateRemainingDays(
    proposal.data.deadline
  );

  $: if ($publicKey) {
    loadAvailableAssets($publicKey);
  }

  $: if (!$voteStore.amount) {
    isAmountValid = false;
  } else if (
    new BigNumber($voteStore.amount).gt(new BigNumber($voteStore.xlmBalance))
  ) {
    invalidInputMessage = checkInvalidInputMessage(
      $voteStore.amount,
      $voteStore.xlmBalance
    );
    isAmountValid = false;
  } else {
    invalidInputMessage = "";
    isAmountValid = true;
  }
</script>

<div class="maheke-governance-modal-container">
  {#if !$voteStore.confirmedVote}
    <div class="maheke-governance-send-vote-modal">
      <label
        for="maheke-governance-send-vote-title"
        class="maheke-governance-send-vote-title"
      >
        {!$xdr
          ? $language.HOW_MANY_XLM_TO_VOTE
          : $language.VOTE_SIGNED_SUCCESSFULLY}
      </label>
      <div class="maheke-governance-available-assets">
        {$language.AVAILABLE}
        {$voteStore.xlmBalance}
        {$language.XLM}
      </div>
      <div class="maheke-governance-vote-amount-container">
        <div class="maheke-governance-vote-asset">
          <img class="maheke-governance-xlm-asset-logo" src={XLMLogo} alt="" />
          {$language.XLM}
        </div>

        <input
          class="maheke-governance-vote-amount"
          id="maheke-governance-vote-amount"
          type="number"
          placeholder={$language.AMOUNT}
          bind:value={$voteStore.amount}
          readonly={$xdr ? true : false}
        />
        <button
          class="maheke-governance-vote-amount-max"
          on:click={handleMaxAssetsButton}
          disabled={$xdr ? true : false}>{$language.MAX}</button
        >
      </div>
      {#if $voteStore.xlmBalance}
        {#if invalidInputMessage}
          <div class="maheke-governance-invalid-input-alert">
            <img class="maheke-governance-info-icon" src={alertIcon} alt="i" />
            {invalidInputMessage}
          </div>
        {/if}
      {/if}
      <div class="maheke-governance-withdraw-assets-alert">
        <img class="maheke-governance-info-icon" src={infoIcon} alt="i" />
        {$language.WITHDRAW_ASSETS}
        {$voteStore.remainingVotingDays}
        {$language.DAYS}
      </div>
      <div class="maheke-governance-vote-confirmation-container">
        <p class="maheke-governance-vote-confirmation-label">
          {$language.VOTE}
        </p>
        <p class="maheke-governance-vote">{$voteStore.registeredVote}</p>
      </div>

      <div class="maheke-governance-btn-container">
        <button
          on:click={closeModal}
          class="maheke-governance-modal-vote-btn cancel-vote-btn {sendingVote
            ? 'vote-btn-disabled'
            : ''}"
          disabled={sendingVote}
        >
          {$language.CANCEL}
        </button>
        <button
          on:click={$xdr ? handleSendVote : handleSignVote}
          class="maheke-governance-modal-vote-btn send-vote-btn
                        {sendingVote && 'vote-btn-loading'}
                        {isAmountValid
            ? 'vote-btn-enabled'
            : 'vote-btn-disabled'}"
          disabled={!isAmountValid || sendingVote}
        >
          {$voteStatus}
        </button>
      </div>
    </div>
  {:else}
    <div class="maheke-governance-vote-confirmation-modal">
      <div>
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_dung2sfv.json"
          background="transparent"
          speed="1"
          style="width: 120px; height: 120px;"
          autoplay
        />
      </div>
      <div>{$language.CONFIRMED_VOTE}</div>
      <div class="maheke-governance-hash-operation-alert">
        <img
          class="maheke-governance-info-icon"
          src={infoIcon}
          alt="info icon"
        />
        <span>
          <strong> {$language.OPERATION_HASH} </strong>{operationHash
            .slice(0, 10)
            .concat("...")
            .concat(operationHash.substr(-10))}.</span
        >
      </div>
      <button
        class="maheke-governance-modal-vote-btn send-vote-btn"
        on:click={closeModal}>{$language.OK}</button
      >
    </div>
  {/if}
</div>

<style>
  .maheke-governance-xlm-asset-logo {
    height: 32px;
  }

  .maheke-governance-info-icon {
    height: 20px;
  }

  .maheke-governance-modal-container {
    width: 450px;
    height: 357px;
    top: 100px;
    left: 30%;
    padding: 0px 20px;
    position: fixed;
    background: #eff0f2 0% 0% no-repeat padding-box;
    box-shadow: 3px 32px 32px #00000029;
    border-radius: 10px;
    z-index: 5;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .maheke-governance-send-vote-modal {
    height: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .maheke-governance-vote-confirmation-modal {
    width: 420px;
    height: 300px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .maheke-governance-send-vote-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .maheke-governance-available-assets {
    width: 100%;
    text-align: right;
    vertical-align: bottom;
    font-size: 12px;
    margin-bottom: 2px;
  }
  .maheke-governance-vote-amount-container {
    width: 100%;
    height: 55px;
    background: #e5e7eb 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .maheke-governance-vote-asset {
    font-size: 20px;
    font-family: Montserrat;
    text-align: center;
    width: 30%;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .maheke-governance-vote-amount {
    font-size: 24px;
    width: 40%;
    background-color: transparent;
    border: none;
    outline: none;
    -moz-appearance: textfield;
  }

  .maheke-governance-vote-amount-max {
    cursor: pointer;
    width: 53px;
    height: 27px;
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000014;
    border: none;
    border-radius: 24px;
    opacity: 1;
    letter-spacing: var(--unnamed-character-spacing-0-12);
    color: var(--btn-text);
    text-align: center;
    font: normal normal 600 12px/15px Montserrat;
    letter-spacing: 0.12px;
    color: #023047;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .maheke-governance-invalid-input-alert {
    min-height: 30px;
    width: 100%;
    box-sizing: border-box;
    background: #f8d7da 0% 0% no-repeat padding-box;
    border-radius: 10px;
    padding: 6px 10px;
    margin: 5px 0px;
    opacity: 1;
    letter-spacing: var(--unnamed-character-spacing-0-14);
    text-align: left;
    font-size: 14px;
    letter-spacing: 0.14px;
    color: #7b2931;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .maheke-governance-withdraw-assets-alert {
    min-height: 30px;
    width: 100%;
    box-sizing: border-box;
    background: #c9e0ee 0% 0% no-repeat padding-box;
    border-radius: 10px;
    padding: 6px 10px;
    margin: 0px 0px 5px;
    opacity: 1;
    letter-spacing: var(--unnamed-character-spacing-0-14);
    text-align: left;
    font: normal normal normal 14px/18px Montserrat;
    letter-spacing: 0.14px;
    color: #166b80;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .maheke-governance-vote-confirmation-container {
    height: 50px;
    min-height: 40px;
    background: #e5e7eb 0% 0% no-repeat padding-box;
    box-sizing: border-box;
    width: 100%;
    margin: 0px 0px 5px;
    border-radius: 10px;
    opacity: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px 10px;
    align-items: center;
  }

  .maheke-governance-vote-confirmation-label {
    font-size: 16px;
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font-weight: bolder;
    margin-right: 5px;
  }
  .maheke-governance-hash-operation-alert {
    height: min-content;
    width: 100%;
    box-sizing: border-box;
    background: #c9e0ee 0% 0% no-repeat padding-box;
    border-radius: 10px;
    padding: 6px 10px;
    opacity: 1;
    word-break: break-all;
    text-align: left;
    font: normal normal normal 14px/18px Montserrat;
    letter-spacing: 0.14px;
    color: #166b80;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .maheke-governance-btn-container {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
  }
  .maheke-governance-modal-vote-btn {
    min-width: 85px;
    width: 40%;
    height: 48px;
    letter-spacing: 0.14px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #023047;
    background: var(--primary-btn) 0% 0% no-repeat padding-box;
    border-radius: 50px;
    opacity: 1;
    border: none;
  }
  .send-vote-btn {
    background: #00ffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
  }

  .vote-btn-enabled:hover {
    box-shadow: inset 0px 0px 12px #ffffff, 0px 0px 18px #00ffff80;
    cursor: pointer;
  }

  .vote-btn-enabled:active {
    background: #026b9f 0% 0% no-repeat padding-box;
    letter-spacing: 0.14px;
    color: #59d5e9;
  }

  .cancel-vote-btn {
    cursor: pointer;
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
  }

  .cancel-vote-btn:hover {
    background: #ecedf3 0% 0% no-repeat padding-box;
    box-shadow: inset 0px 0px 12px #ffffff, 0px 0px 18px #ffffff57;
  }
  .cancel-vote-btn:active {
    background: #026b9f 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    color: #34d5db;
  }
  .vote-btn-disabled {
    opacity: 0.7;
  }

  .vote-btn-loading {
    cursor: progress !important;
    opacity: 0.7;
  }
  @media (max-width: 1024px) {
    .maheke-governance-modal-container {
      top: 150px;
      left: 25%;
      max-width: 400px;
      padding: 20px 15px;
    }
    .maheke-governance-btn-container {
      width: 90%;
    }
    .maheke-governance-modal-vote-btn {
      min-width: 150px;
    }
    .maheke-governance-send-vote-modal {
      padding: 0px;
      height: 300px;
      margin-left: 10px;
      width: 95%;
      justify-content: space-around;
    }
    .maheke-governance-send-vote-title {
      margin-bottom: 15px;
    }
    .maheke-governance-invalid-input-alert {
      min-height: 50px;
      font-size: 12px;
      padding: 2px 8px;
    }
    .maheke-governance-withdraw-assets-alert {
      min-height: 20px;
      font-size: 12px;
      padding: 2px 10px;
    }
    .maheke-governance-info-icon {
      height: 16px;
      margin-right: 8px !important;
    }
  }
  @media (max-width: 520px) {
    .maheke-governance-modal-container {
      top: 90px;
      left: 15%;
      max-width: 280px;
      padding: 20px 10px;
    }

    .maheke-governance-modal-vote-btn {
      min-width: 100px;
    }
    .maheke-governance-send-vote-modal {
      padding: 0px;
      margin-left: 5px;
      width: 95%;
    }
    .maheke-governance-send-vote-title {
      margin-bottom: 15px;
    }
    .maheke-governance-invalid-input-alert {
      font-size: 12px;
      padding: 2px 8px;
      min-height: 60px;
    }
    .maheke-governance-withdraw-assets-alert {
      min-height: 40px;
      font-size: 12px;
    }
    .maheke-governance-info-icon {
      height: 16px;
    }
  }

  @media (max-width: 340px) {
    .maheke-governance-modal-container {
      left: 3%;
    }
  }
</style>
