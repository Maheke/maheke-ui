<script lang="ts">
  import {
    proposal,
    proposalStatus,
    sendingError,
    sendingProposal,
    sendingSuccess,
  } from "./proposalStore";
  import arrowBack from "@/assets/svg/arrow-back.svg";
  import {
    openConnectWindow,
    openSignWindow,
  } from "@/helpers/simpleSignerHelper";
  import ProposalCreationSuccessModal from "@/lib/components/proposals/newProposal/proposalCreationSuccessModal.svelte";
  import { saveProposal } from "@/lib/services/governance";
  import { createFeePaymentClaimableBalance } from "@/lib/stellar/stellarHelper";
  import { language, publicKey, xdr } from "@/lib/store/store";
  import { Server, TransactionBuilder } from "stellar-sdk";

  let isProposalValid = true;
  let operationHash: string;
  const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);

  $: if ($sendingSuccess) {
    $proposalStatus = "PROPOSAL SUCCESSFULLY SENT!";
  } else if ($sendingError) {
    $proposalStatus = "ERROR! SUBMISSION OF PROPOSAL FAILED";
  } else if ($sendingProposal) {
    $proposalStatus = "SENDING PROPOSAL...";
  } else {
    $proposalStatus = "SEND PROPOSAL";
  }

  $: $proposal.creator && $proposal.name && $proposal.description
    ? (isProposalValid = true)
    : (isProposalValid = false);

  $: $proposal.creator = $publicKey;

  async function handleCreateProposalButton() {
    if (!$proposal.creator) {
      openConnectWindow();
    } else if (isProposalValid) {
      const xdrUnsigned = await createFeePaymentClaimableBalance(
        $proposal.creator
      );
      openSignWindow(xdrUnsigned);
    }
  }

  async function handleSendProposalButton() {
    if ($sendingProposal) {
      return;
    } else {
      $sendingError = false;
      $sendingSuccess = false;
      $sendingProposal = true;
      const transaction = await server.submitTransaction(
        TransactionBuilder.fromXDR(
          $xdr,
          import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE
        )
      );
      const result = await saveProposal($proposal);
      $sendingProposal = false;
      if (result.ok) {
        $sendingSuccess = true;
        operationHash = transaction.hash;
      } else {
        $sendingError = true;
      }
    }
  }

  $: console.log({ creator: $proposal.creator, xdr: $xdr });
</script>

<div class="maheke-governance-create-proposal-container">
  <form class="maheke-governance-form-proposal">
    <a href="/" class="maheke-governance-back-btn"
      >{$language.BACK}
      <img
        class="maheke-governance-back-icon"
        src={arrowBack}
        alt={arrowBack}
      />
    </a>
    <input
      class="maheke-governance-input-title"
      placeholder={$language.PROPOSAL_TITLE_PLACEHOLDER}
      maxlength="28"
      bind:value={$proposal.name}
    />
    <div class="maheke-governance-button-section">
      <textarea
        class="maheke-governance-text-area-description "
        placeholder={$language.CREATE_PROPOSAL_PLACEHOLDER}
        bind:value={$proposal.description}
      />
      {#if $proposal.creator && $xdr}
        <button
          class="maheke-governance-send-proposal-btn"
          on:click={handleSendProposalButton}
          type="button"
        >
          {$proposalStatus}
        </button>
      {:else}
        <button
          class={!$proposal.creator || isProposalValid
            ? "maheke-governance-create-proposal-btn "
            : "btn-disabled"}
          type="button"
          on:click={handleCreateProposalButton}
        >
          {$proposal.creator ? $language.CREATE_PROPOSAL : $language.CONNECT}
        </button>
      {/if}
    </div>
  </form>
  <div class="maheke-governance-section">
    <h2 class="maheke-governance-section-title">{$language.MAHEKE_PROJECTS}</h2>
    <span class="maheke-governance-section-paragraph-one"
      >{$language.MAHEKE_PROJECTS_DESCRIPTION}</span
    >
    <span class="maheke-governance-section-paragraph-two">
      {$language.MAHEKE_PROJECTS_DESCRIPTION2}
      <a class="maheke-governance-projects-link" href="/proyectos"
        >{$language.FAQ}</a
      >.
    </span>
  </div>
</div>
{#if $sendingSuccess}
  <ProposalCreationSuccessModal {operationHash} />
{/if}

<style>
  .maheke-governance-button-section {
    width: 100%;
    height: 400px;
    background: transparent
      linear-gradient(277deg, #c251ff33 0%, #96e1ff80 50%, #1affabbf 157%) 38%
      0% no-repeat padding-box;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    border-radius: 25px;
    position: relative;
  }

  .maheke-governance-section-paragraph-one,
  .maheke-governance-section-paragraph-two {
    font-size: 20px;
  }
  .maheke-governance-section-paragraph-one {
    margin-bottom: 15px;
  }
  .maheke-governance-section-title {
    font-size: 42px;
    margin-bottom: 50px;
  }
  .maheke-governance-form-proposal {
    justify-content: center;
    flex-direction: column;
    margin-top: 114px;
    width: 70%;
  }

  .maheke-governance-back-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    width: 76px;
    height: 28px;
    box-shadow: 0px 3px 6px #00000014;
    color: #023047;
    font-weight: bolder;
    font-size: 12px;
    border-radius: 24px;
    cursor: pointer;
  }

  .maheke-governance-back-btn:link,
  .maheke-governance-back-btn:visited,
  .maheke-governance-back-btn:active {
    text-decoration: none;
  }

  .maheke-governance-back-icon {
    margin-left: 5px;
    height: 18px;
  }
  .maheke-governance-projects-link {
    color: #1bfeac;
  }
  .maheke-governance-text-area-description {
    width: 100%;
    height: 71%;
    margin: 0;
    position: absolute;

    font-size: 16px;
    resize: none;
    border: none;
    background: none;
    opacity: 0.6;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 20px;
    margin-top: 30px;
    box-sizing: border-box;
  }

  .maheke-governance-text-area-description::placeholder {
    color: #ffffff;
  }
  .maheke-governance-text-area-description:focus,
  .maheke-governance-input-title:focus {
    outline: none;
  }
  .maheke-governance-text-area-description:focus::placeholder,
  .maheke-governance-input-title:focus::placeholder {
    color: transparent;
    transition: color 0.2s ease;
  }
  .maheke-governance-input-title {
    background: transparent
      linear-gradient(289deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0%
      no-repeat padding-box;
    width: 100%;
    height: 109px;
    border-radius: 25px;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    backdrop-filter: blur(8px);
    margin-bottom: 5px;

    font-size: 24px;
    margin-top: 20px;
    border: none;
    opacity: 0.6;
    text-indent: 30px;
  }
  .maheke-governance-input-title::placeholder {
    color: #ffffff;
  }

  .maheke-governance-section {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 321px;
    color: #ffffff;
    margin-top: 156px;
  }
  .maheke-governance-create-proposal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .maheke-governance-input-title {
    background: transparent
      linear-gradient(289deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0%
      no-repeat padding-box;
    width: calc(100% - 4px);
    height: 109px;
    border-radius: 25px;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    backdrop-filter: blur(8px);
    margin-bottom: 5px;
  }

  .maheke-governance-create-proposal-btn,
  .maheke-governance-send-proposal-btn {
    bottom: 28px;
    right: 1px;
    position: absolute;
    color: #023047;

    font-weight: bold;
    width: 211px;
    height: 48px;
    background: #ecedf3 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    color: #023047;
    border-radius: 50px;
    border: none;
    margin-right: 20px;
    letter-spacing: 0.14px;
    cursor: pointer;
  }

  .maheke-governance-send-proposal-btn {
    background: #00ffff 0% 0% no-repeat padding-box;
  }
  .maheke-governance-create-proposal-btn:hover,
  .maheke-governance-send-proposal-btn:hover {
    background: #00ffff 0% 0% no-repeat padding-box;
    box-shadow: inset 0px 0px 6px #ffffff, 0px 0px 10px #00ffff80;
  }

  .btn-disabled {
    bottom: 28px;
    right: 1px;
    position: absolute;
    color: #023047;
    font-weight: bold;
    width: 211px;
    height: 48px;
    background: rgba(236, 237, 243, 0.5) 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    border-radius: 50px;
    border: none;
    margin-right: 20px;
    letter-spacing: 0.14px;
  }
  @media (max-width: 790px) {
    .maheke-governance-form-proposal {
      width: 90%;
    }
  }
</style>
