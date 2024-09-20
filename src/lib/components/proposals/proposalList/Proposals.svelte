<script lang="ts">
  import type { IProposalList } from "./IProposalList";
  import LoadingProposal from "./LoadingProposal.svelte";
  import ProposalSort from "./ProposalSort.svelte";
  import ProposalsList from "./ProposalsList.svelte";
  import { error, is404, language, loading } from "@/lib/store/store";
  import { getProposalStatus } from "@/routes/community/proposalsHelper";
  import { onMount } from "svelte";

  type ItemsObject = {
    items: {
      id: string;
    }[];
    [Symbol.iterator](): IterableIterator<{ id: string }>;
  };

  const jsonData: ItemsObject = {
    items: [
      { id: "qdpRsAqM" },
      { id: "BkxnTuFT" },
      { id: "UYPHPbe" },
      { id: "UrBvDGjB" },
      { id: "mMhyfqB" },
    ],
    [Symbol.iterator]: function* () {
      yield* this.items;
    },
  };

  let proposalList1 = [
    {
      name: "Test Proposal2",
      description: "Test description2",
      creator: "GCVEEP4PZK64YHGHJLKOGPGW5DSSZKZ4BNEFNLFPSNIRKMRNYGP3UMV6",
      deadline: "2022-08-20T00:00:00Z",
      created: "2022-07-20T14:15:53Z",
      options: [
        {
          name: "FOR",
        },
        {
          name: "AGAINST",
        },
      ],
      votingResult: null,
    },
    {
      name: "Test Proposal3",
      description: "Test description3",
      creator: "GCOHVVWFIJM7HCOPGALFUPX3QJ3EXQNXXVZMJ2ONCU7YS7HDZM62OJQZ",
      deadline: "2022-07-20T00:00:00Z",
      created: "2022-06-20T14:33:07Z",
      options: [
        {
          name: "FOR",
        },
        {
          name: "AGAINST",
        },
      ],
      votingResult: "FOR",
    },
    {
      name: "Test Proposal4",
      description: "Test description4",
      creator: "GA2S5KMVVWW232MB3MF4GCCN2Z5GPWPEGKGLNFSXRFVSUHETQXIDXFVN",
      deadline: "2022-08-20T00:00:00Z",
      created: "2022-07-20T14:45:54Z",
      options: [
        {
          name: "FOR",
        },
        {
          name: "AGAINST",
        },
      ],
      votingResult: null,
    },
    {
      name: "Proposal5",
      description: "Description5",
      creator: "GAI7S4LUVY4A3RXR2472L4PMJESSJTPDPTCIR5A7CVTST3RPNMSAVK4L",
      deadline: "2022-08-20T00:00:00Z",
      created: "2022-07-20T18:34:09Z",
      options: [
        {
          name: "FOR",
        },
        {
          name: "AGAINST",
        },
      ],
      votingResult: null,
    },
  ];

  let page = 1;
  let proposalList: IProposalList;

  async function handleNextPage() {
    window.scrollTo(0, 0);
    page++;
    proposalList1 = [];
    await renderProposals();
  }

  async function handlePreviousPage() {
    window.scrollTo(0, 0);
    page--;
    proposalList1 = [];
    await renderProposals();
  }

  async function renderProposals() {
    try {
      $loading = true;

      for (const proposal of jsonData) {
        const proposalResult = {
          name: "Proposal1NameTest",
          description: "A testing proposal",
          creator: "GDYNGOL2H757AUFYGX3ZTUPCMEKRHJFIXTXWQ7HCX7QHUUTMPEQJP7YF",
          deadline: "2022-05-28T03:00:00+00:00",
          created: "2022-04-28T11:03:41.6709264+00:00",
          whitelistedAssets: [
            {
              asset: { isNative: true, code: "XLM", issuer: "" },
              multiplier: 1,
            },
            {
              asset: {
                isNative: false,
                code: "USDC",
                issuer:
                  "GCDNASAGVK2QYBB5P2KS75VG5YP7MOVAOUPCHAFLESX6WAI2Z46TNZPY",
              },
              multiplier: 2,
            },
          ],
          options: [{ name: "FOR" }, { name: "AGAINST" }],
          votingResult: null,
        };

        proposalList1.push(getProposalStatus(proposal.id, proposalResult));
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
  {:else}
    <ProposalsList proposalsList={proposalList1} />
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
