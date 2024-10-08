<script lang="ts">
  import { isModalVisible } from "./voteStore";
  import arrowBack from "@/assets/svg/arrow-back.svg";
  import type { IProposalsList } from "@/lib/components/proposals/IProposalsList";
  import ProposalVotes from "@/lib/components/proposals/proposalVotes/ProposalVotes.svelte";
  import ProposalDetails from "@/lib/components/proposals/voteProposal/ProposalDetails.svelte";
  import ProposalInformation from "@/lib/components/proposals/voteProposal/ProposalInformation.svelte";
  import ProposalLoading from "@/lib/components/proposals/voteProposal/ProposalLoading.svelte";
  import VoteModal from "@/lib/components/proposals/voteProposal/VoteModal.svelte";
  import { getProposal } from "@/lib/services/governance";
  import { error, is404, language, loading } from "@/lib/store/store";
  import { getProposalStatus } from "@/routes/community/proposalsHelper";
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";

  const params = useParams();

  let proposalInfo: IProposalsList;

  onMount(async () => {
    if ($params["id"]) {
      try {
        $loading = true;
        const proposal = await getProposal($params["id"]);
        proposalInfo = getProposalStatus($params["id"], proposal);
        $loading = false;
      } catch (e) {
        console.error(e);
        $loading = false;
        $error = `${e}`;
      }
    }
  });
</script>

<div class="maheke-governance-main-proposal-vote-container">
  <div class="maheke-governance-proposal-vote-header">
    <div class="maheke-governance-back-btn">
      <a href="/" class="maheke-governance-back-anchor">{$language.BACK}</a>
      <img
        class="maheke-governance-back-icon"
        src={arrowBack}
        alt={arrowBack}
      />
    </div>
  </div>
  <div class="maheke-governance vote-row-container">
    {#if $loading}
      <ProposalLoading />
    {:else if $is404}
      <p class="maheke-governance not-found-paragraph">
        {$language.PROPOSAL_NOT_FOUND}
      </p>
    {:else if $error}
      <p class="maheke-governance error-paragraph">{$error}</p>
    {:else if proposalInfo}
      <ProposalDetails proposal={proposalInfo} />
      <ProposalInformation proposal={proposalInfo} />
    {/if}
  </div>
  {#if proposalInfo}
    <ProposalVotes proposal={proposalInfo} />
  {/if}
</div>
{#if $isModalVisible}
  <VoteModal proposal={proposalInfo} />
{/if}

<style>
  .maheke-governance.vote-row-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .maheke-governance-back-icon {
    height: 18px;
  }

  .maheke-governance-main-proposal-vote-container {
    color: #ffffff;
    font-size: 16px;
    display: flex;
    z-index: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 153px;
    margin-bottom: 100px;
    margin-left: 100px;
    margin-right: 100px;
  }
  .maheke-governance-proposal-vote-header {
    width: 85%;
    margin: 10px 0px;
  }
  .maheke-governance-back-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #023047;
    font-weight: bolder;
    font-size: 12px;
    align-items: center;
    background: #ffffff;
    width: 76px;
    height: 28px;
    box-shadow: 0px 3px 6px #00000014;
    border-radius: 24px;
    cursor: pointer;
  }
  .maheke-governance-back-anchor:link,
  .maheke-governance-back-anchor:visited,
  .maheke-governance-back-anchor:active {
    text-decoration: none;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
  @media (max-width: 1024px) {
    .maheke-governance.vote-row-container {
      flex-wrap: wrap;
      width: 95%;
    }

    .maheke-governance-proposal-vote-header {
      width: 95%;
    }

    .maheke-governance-main-proposal-vote-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      margin-top: 15%;
      width: 100%;
      box-sizing: border-box;
    }
  }
  @media (max-width: 770px) {
    .maheke-governance-main-proposal-vote-container {
      margin-top: 0;
    }
  }
</style>
