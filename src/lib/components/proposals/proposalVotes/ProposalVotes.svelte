<script lang="ts">
  import { voteStore } from "../../../../routes/voteProposal/voteStore";
  import LocalStorage from "../../../storage/LocalStorage";
  import { loading, publicKey } from "../../../store/store";
  import { language } from "../../language/languageStore";
  import type IProposalVotes from "./IProposalVotes";

  export let proposal;
  const storage = new LocalStorage();
  let proposalVotes: IProposalVotes[];

  function clearStores() {
    $voteStore.confirmedVote = false;
    $voteStore.registeredVote = "";
  }

  function checkIfUserVoted(proposalID: string) {
    const storageProposalVotes = storage.getItem(proposalID);
    if (storageProposalVotes) {
      proposalVotes = JSON.parse(storageProposalVotes);
      for (const proposalVote of proposalVotes) {
        if (proposalVote.publicKey === $publicKey) {
          $voteStore.confirmedVote = true;
          $voteStore.registeredVote = proposalVote.vote;
        }
      }
    }
  }

  function getShortenedPublicKey(key: string) {
    return key.slice(0, 3).concat("...").concat(key.substr(-3));
  }

  $: if (!$publicKey) {
    clearStores();
  }

  $: if (!$loading || $publicKey || $voteStore.confirmedVote) {
    checkIfUserVoted(proposal.id);
  }
</script>

{#if proposalVotes}
  <div class="maheke-governance proposal-votes-container">
    <h4 class="maheke-governance votes-lenght-title">
      {proposalVotes.length}
      {$language.VOTES}
    </h4>
    {#each proposalVotes as votes}
      <div class="maheke-governance proposal-votes">
        <p class="maheke-governance user-key">
          {getShortenedPublicKey(votes.publicKey)}
        </p>
        <p class="maheke-governance user-vote">{votes.vote}</p>
        <div class="maheke-governance vote-asset">
          <div class="asset-bullet-point" />
          <p class="maheke-governance vote-asset-paragraph">{$language.XLM}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .maheke-governance.proposal-votes-container {
    border-radius: 25px;
    padding: 40px 30px 40px 30px;
    width: 70%;
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
    box-sizing: border-box;
    margin-top: 10px;
  }

  .maheke-governance.votes-lenght-title {
    margin: 0;
    margin-bottom: 27px;
    font-size: 18px;
    font-weight: 400;
  }

  .maheke-governance.proposal-votes {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    font-weight: 300;
  }

  .maheke-governance.proposal-votes:last-child {
    margin: 0;
  }

  .maheke-governance.user-key {
    color: #1bfeac;
    width: 100px;
  }

  .maheke-governance.vote-asset {
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    gap: 5px;
  }

  .asset-bullet-point {
    border-radius: 50%;
    width: 28px;
    height: 28px;
    background: #c7c8c9 0% 0% no-repeat padding-box;
    opacity: 1;
    float: left;
    vertical-align: center;
    margin: 2px;
  }

  p {
    margin: 0;
  }

  @media (max-width: 1023px) {
    .maheke-governance.proposal-votes-container {
      width: 95%;
      margin-bottom: 100px;
    }
  }
</style>
