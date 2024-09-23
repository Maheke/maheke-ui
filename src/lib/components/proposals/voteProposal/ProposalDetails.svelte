<script lang="ts">
  import { openConnectWindow } from "@/helpers/simpleSignerHelper";
  import { language } from "@/lib/components/language/languageStore";
  import Status from "@/lib/components/status/Status.svelte";
  import { publicKey, xdr } from "@/lib/store/store";
  import { isModalVisible, voteStore } from "@/routes/voteProposal/voteStore";

  export let proposal;

  function toggleModal() {
    if ($voteStore.registeredVote) {
      $isModalVisible = !$isModalVisible;
      $voteStore.amount = "";
      $xdr = "";
    }
  }

  function handleVoteButton(vote: string) {
    $voteStore.registeredVote = vote;
  }
</script>

<div class="maheke-governance-proposal-container">
  <div class="maheke-governance-index-proposal">
    {proposal.name}
    {$language.BY}
    <a href="/"
      >{proposal.creator
        .slice(0, 3)
        .concat("...")
        .concat(proposal.creator.substr(-3))}</a
    >
  </div>
  <div class="maheke-governance-proposal-details-container">
    <h3 class="maheke-governance-proposal-title">{proposal.name}</h3>
    <div class="maheke-governance-proposal-details">{proposal.description}</div>
  </div>
  <div class="maheke-governance-proposal-vote-container">
    <div class="maheke-governance select-vote-container">
      {#if proposal.votingResult}
        <p class="maheke-governance-proposal-vote-label">
          {$language.FINAL_RESULT}
        </p>
        <Status status="ACTIVE" />
      {:else if !$voteStore.confirmedVote}
        <p class="maheke-governance-proposal-vote-label">
          {$language.CAST_VOTE}
        </p>
        {#each proposal.options as option}
          <button
            class={`maheke-governance-vote-btn vote-${option.name}-btn`.toLowerCase()}
            on:click={() => {
              handleVoteButton(option.name);
            }}
          >
            {$language[option.name].toUpperCase()}
          </button>
        {/each}
      {:else}
        <div class="maheke-governance-sent-vote-container">
          <p class="maheke-governance-proposal-vote-label">
            {$language.YOUR_VOTE}
          </p>
          <button
            class="maheke-governance-sent-vote-btn vote-against-btn"
            disabled>{$voteStore.registeredVote}</button
          >
        </div>
      {/if}
    </div>

    {#if !$publicKey && !proposal.votingResult}
      <button
        class="maheke-governance-send-vote-modal-btn"
        on:click={() => {
          openConnectWindow();
        }}
      >
        {$language.CONNECT}
      </button>
    {:else if !proposal.votingResult && !$voteStore.confirmedVote}
      <button
        class="maheke-governance-send-vote-modal-btn {!$voteStore.registeredVote &&
          'vote-btn-disabled'}"
        on:click={toggleModal}
        disabled={!$voteStore.registeredVote}
      >
        {$voteStore.registeredVote
          ? `${$language.VOTE} ${$voteStore.registeredVote}`
          : $language.CAST_VOTE}
      </button>
    {/if}
  </div>
</div>

<style>
  .maheke-governance-proposal-vote-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .maheke-governance-proposal-container {
    border-radius: 25px;
    width: 70%;
    padding: 30px 30px 50px;
    background: transparent
      linear-gradient(302deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0%
      no-repeat padding-box;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    opacity: 1;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 420px;
    box-sizing: border-box;
    margin-right: 10px;
  }

  .maheke-governance-index-proposal {
    height: 60px;
    margin-bottom: 0;
  }

  .maheke-governance-proposal-details-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 200px;
    padding: 10px 0px;
  }

  .maheke-governance-proposal-title {
    font-size: 24px;
    font-weight: bold;
    word-wrap: break-word;
    margin: 0;
    height: 25%;
  }
  .maheke-governance-proposal-vote-main-container {
    display: flex;
    justify-content: space-between;
  }

  .maheke-governance-proposal-vote-label {
    font-weight: normal;
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    align-items: flex-end;
  }

  .maheke-governance-vote-btn-container {
    display: flex;
    justify-content: space-between;
  }
  .maheke-governance-vote-btn {
    width: 95px;
    height: 48px;
    color: #023047;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    margin-right: 10px;
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    border-radius: 50px;
    opacity: 1;
    border: none;
    justify-content: center;
  }

  .vote-btn-disabled {
    cursor: not-allowed !important;
    opacity: 0.7;
  }

  .maheke-governance-vote-btn:hover {
    box-shadow: inset 0px 0px 12px #ffffff, 0px 0px 18px #ffffff57;
    cursor: pointer;
  }

  .maheke-governance-vote-btn:active {
    background: #026b9f 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    color: #34d5db;
  }
  .maheke-governance-send-vote-btn-container {
    display: flex;
    align-items: flex-end;
  }

  .maheke-governance-sent-vote-btn {
    width: 83px;
    height: 48px;
    color: #34d5db;
    font-size: 14px;
    font-weight: bold;
    background: var(--btn-on-click) 0% 0% no-repeat padding-box;
    background: #026b9f 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    border-radius: 50px;
    opacity: 1;
    border: none;
    justify-content: center;
    cursor: not-allowed;
  }

  .maheke-governance-send-vote-modal-btn {
    justify-self: right;
    width: 173px;
    height: 48px;
    letter-spacing: 0.14px;
    color: #023047;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    background: var(--primary-btn) 0% 0% no-repeat padding-box;
    background: #00ffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
    border-radius: 50px;
    opacity: 1;
    border: none;
  }

  .maheke-governance-send-vote-modal-btn:hover {
    box-shadow: inset 0px 0px 12px #ffffff, 0px 0px 18px #00ffff80;
    cursor: pointer;
  }

  .maheke-governance-send-vote-modal-btn:active {
    background: #026b9f 0% 0% no-repeat padding-box;
    letter-spacing: 0.14px;
    color: #59d5e9;
  }

  @media (max-width: 1024px) {
    .maheke-governance-proposal-container {
      width: 100%;
      box-sizing: border-box;
    }
  }

  @media (max-width: 570px) {
    .maheke-governance.select-vote-container {
      width: 100%;
    }

    .maheke-governance-proposal-vote-container {
      flex-direction: column;
    }

    .maheke-governance-proposal-container {
      width: 100%;
      height: 500px;
      padding: 50px 25px;
    }
    .maheke-governance-proposal-vote-main-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: stretch;
    }

    .maheke-governance-proposal-vote-label {
      width: 100%;
    }

    .maheke-governance-vote-btn {
      max-width: 85px;
      max-height: 50px;
      margin-bottom: 20px;
      margin-right: 15px;
    }
    .maheke-governance-send-vote-btn-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .maheke-governance-send-vote-modal-btn {
      width: 175px;
      max-height: 50px;
      margin: 20px 25% 0px;
    }
  }
</style>
