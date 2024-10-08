<script lang="ts">
  import { language } from "@/lib/components/language/languageStore";
  import { IProposalsList } from "@/lib/components/proposals/IProposalsList";
  import Status from "@/lib/components/status/Status.svelte";

  export let proposalsList: IProposalsList[];
</script>

{#each proposalsList as proposal}
  <article class="maheke-governance proposal-container">
    <div class="maheke-governance proposal-info-container">
      <div class="maheke-governance proposal-info-items">
        <article class="maheke-governance proposal-article">
          <h1 class="maheke-governance proposal-title">{proposal.data.name}</h1>
          <p class="maheke-governance proposal-info-paragraph">
            {proposal.data.description}
          </p>
        </article>
        <div
          class="maheke-governance proposal-status-container flex-row-flex-start"
        >
          <Status status="ACTIVE" />
          <p class="maheke-governance proposal-finish-paragraph">
            Ends in 10 days
          </p>
        </div>
      </div>
    </div>
    <a
      href="/proposal/{proposal.id}"
      class="maheke-governance see-vote-proposal-anchor gov-button"
    >
      {$language.SEE_VOTE}
    </a>
  </article>
{/each}

<style>
  .maheke-governance.proposal-container {
    margin-bottom: 19px;
  }

  .maheke-governance.proposal-container {
    background: transparent
      linear-gradient(283deg, #c251ff33 0%, #96e1ff80 52%, #1affab7a 100%) 0% 0%
      no-repeat padding-box;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    border-radius: 25px;
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    text-transform: uppercase;
    font-weight: bold;
  }

  .maheke-governance.proposal-info-items {
    margin-top: 60px;
    margin-left: 35px;
    margin-right: 60px;
    margin-bottom: 40px;
  }

  .maheke-governance.proposal-title {
    text-transform: none;
  }

  .maheke-governance.proposal-finish-paragraph {
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    margin-left: 10px;
    text-transform: none;
  }

  .maheke-governance.see-vote-proposal-anchor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    margin-top: 60px;
    margin-right: 60px;
    height: 35px;
    min-width: 121px;
    letter-spacing: 0.12px;
  }

  .maheke-governance.proposal-article h1 {
    margin: 0;
    margin-top: 60px;
    color: #ffffff;
    font-size: 24px;
    word-break: break-word;
  }

  .maheke-governance.proposal-info-paragraph {
    color: #ffffff;
    font-size: 16px;
    font-weight: 300;
    max-width: 600px;
    text-transform: none;
    overflow: hidden;
  }

  .maheke-governance.proposal-info-container {
    max-width: 864px;
  }

  @media (max-width: 730px) {
    .maheke-governance.proposal-info-items {
      margin-top: 50px;
      margin-left: 25px;
      margin-right: 25px;
      display: flex;
      flex-direction: column-reverse;
    }

    .maheke-governance.proposal-info-paragraph {
      margin: 0;
      margin-top: 30px;
      line-height: 26px;
    }

    .maheke-governance.see-vote-proposal-anchor {
      margin: 0;
      margin-bottom: 60px;
      margin-left: 60px;
      margin-left: 0;
    }

    .maheke-governance.proposal-container {
      flex-direction: column;
      align-items: center;
    }

    .maheke-governance.proposal-article h1 {
      margin-top: 30px;
    }

    .maheke-governance.proposal-info-container {
      width: 100%;
    }
  }
</style>
