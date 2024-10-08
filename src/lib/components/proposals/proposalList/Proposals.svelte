<script lang="ts">
  import type { IProposalList } from "./IProposalList";
  import LoadingProposal from "./LoadingProposal.svelte";
  import ProposalSort from "./ProposalSort.svelte";
  import ProposalsList from "./ProposalsList.svelte";
  import { getProposal, getProposalList } from "@/lib/services/governance";
  import { error, is404, language, loading } from "@/lib/store/store";
  import { proposalsList } from "@/routes/community/proposalListStore";
  import { getProposalStatus } from "@/routes/community/proposalsHelper";
  import { onMount } from "svelte";

  let page = 1;
  let proposalList: IProposalList;

  async function handleNextPage() {
    window.scrollTo(0, 0);
    page++;
    $proposalsList = [];
    await renderProposals();
  }

  async function handlePreviousPage() {
    window.scrollTo(0, 0);
    page--;
    $proposalsList = [];
    await renderProposals();
  }

  async function renderProposals() {
    try {
      const proposalsPerPage = 5;
      $loading = true;
      proposalList = await getProposalList(proposalsPerPage, page);

      for (const proposal of proposalList.items) {
        const proposalResult = await getProposal(proposal.id);
        $proposalsList.push(getProposalStatus(proposal.id, proposalResult));
      }

      $loading = false;
    } catch (e) {
      console.error(e);
      $loading = false;
      $error = `${e}`;
    }
  }

  onMount(async () => {
    await renderProposals();
  });
</script>

<div class="maheke-governance proposals-container">
  <header class="maheke-governance proposal-header-container">
    <div
      class="maheke-governance sort-proposals-container row-space-between-center"
    >
      <p class="maheke-governance sort-proposals-paragraph">
        {$language.PROPOSALS}
      </p>
      <ProposalSort />
    </div>
    <a
      href="/new-proposal"
      class="maheke-governance create-proposals-anchor gov-button"
    >
      {$language.CREATE_PROPOSAL}
    </a>
  </header>
  {#if $loading}
    <LoadingProposal />
  {:else if $is404}
    <p class="maheke-governance not-found-paragraph">
      {$language.PROPOSAL_NOT_FOUND}
    </p>
  {:else if $error}
    <p class="maheke-governance error-paragraph">{$error}</p>
  {:else if proposalList}
    <ProposalsList proposalsList={$proposalsList} />
    <div class="maheke-governance btn-container">
      <button
        on:click={() => handlePreviousPage()}
        class="maheke-governance pagination-btn gov-button {proposalList?.currentPage ===
        1
          ? 'hide-btn'
          : 'active'}">{$language.PREVIOUS}</button
      >
      <button
        on:click={() => handleNextPage()}
        class="maheke-governance pagination-btn gov-button {proposalList?.currentPage ===
        proposalList?.totalPages
          ? 'hide-btn'
          : 'active'}">{$language.NEXT}</button
      >
    </div>
  {/if}
</div>

<style>
  .maheke-governance.pagination-btn.hide-btn {
    display: none;
  }
  .maheke-governance.btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    margin-right: 60px;
  }
  .maheke-governance.pagination-btn {
    text-decoration: none;
    text-align: center;
    height: 35px;
    min-width: 121px;
    letter-spacing: 0.12px;
  }
  .maheke-governance.proposal-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .maheke-governance.sort-proposals-container {
    margin-left: 20px;
    position: relative;
  }

  .maheke-governance.proposals-container {
    width: 70%;
    margin-top: 157px;
  }

  .maheke-governance.create-proposals-anchor {
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 30px;
    height: 48px;
    width: 206px;
    font-size: 14px;
  }

  .maheke-governance.sort-proposals-paragraph {
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  @media (max-width: 1024px) {
    .maheke-governance.proposals-container {
      width: 90%;
    }
    .maheke-governance.btn-container {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 768px) {
    .maheke-governance.proposals-container {
      width: 95%;
    }

    .maheke-governance.proposals-container {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
    }

    .maheke-governance.proposal-header-container {
      width: 99%;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-start;
      align-items: center;
    }

    .maheke-governance.sort-proposals-container {
      width: 100%;
      justify-content: flex-start;
      margin-top: 53px;
      margin-bottom: 15px;
    }

    .maheke-governance.sort-proposals-paragraph {
      font-weight: 400;
      font-size: 18px;
    }

    .maheke-governance.create-proposals-anchor {
      margin: 0;
    }

    .maheke-governance.btn-container {
      margin-bottom: 60px;
      margin-left: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
