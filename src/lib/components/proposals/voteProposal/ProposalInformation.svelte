<script lang="ts">
  import { language } from "@/lib/components/language/languageStore";
  import Status from "@/lib/components/status/Status.svelte";

  const proposal1 = {
    name: "Proposal1NameTest",
    description: "A testing proposal",
    creator: "GDYNGOL2H757AUFYGX3ZTUPCMEKRHJFIXTXWQ7HCX7QHUUTMPEQJP7YF",
    deadline: "2024-07-25T03:00:00+00:00",
    created: "2024-07-25T11:03:41.6709264+00:00",
    whitelistedAssets: [
      { asset: { isNative: true, code: "XLM", issuer: "" }, multiplier: 1 },
      {
        asset: {
          isNative: false,
          code: "USDC",
          issuer: "GCDNASAGVK2QYBB5P2KS75VG5YP7MOVAOUPCHAFLESX6WAI2Z46TNZPY",
        },
        multiplier: 2,
      },
    ],
    options: [{ name: "FOR" }, { name: "AGAINST" }],
    votingResult: null,
  };

  function getDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.toLocaleDateString()}, ${String(
      newDate.getHours()
    ).padStart(2, "0")}:${String(newDate.getMinutes()).padStart(2, "0")}`;
  }
</script>

<div class="maheke-governance-proposal-info-container">
  <h4 class="maheke-governance-proposal-info-title">
    {$language.PROPOSAL_INFORMATION}
  </h4>
  <Status status="ACTIVE" />
  <div class="maheke-governance-proposal-start-date-container">
    <p class="maheke-governance-proposal-information-label">
      {$language.PROPOSAL_START_DATE}
    </p>
    <p class="maheke-governance-proposal-start-date">
      {getDate(proposal1.created)}
    </p>
  </div>
  <div class="maheke-governance-proposal-end-date-container">
    <p class="maheke-governance-proposal-information-label">
      {$language.PROPOSAL_END_DATE}
    </p>
    <p class="maheke-governance-proposal-end-date">
      {getDate(proposal1.deadline)}
    </p>
  </div>
  <div class="maheke-governance-proposal-accepted-assets-container">
    <div class="maheke-governance-proposal-information-label">
      {$language.PROPOSAL_ACCEPTED_ASSETS}
    </div>
    <ul class="maheke-governance-accepted-assets-list">
      {#each proposal1.whitelistedAssets as whitelistedAsset}
        <li class="maheke-governance-accepted-asset-item">
          <div class="asset-bullet-point" />
          <div>
            {whitelistedAsset.asset.code}
            <a href="/">
              ({whitelistedAsset.asset.issuer
                .slice(0, 3)
                .concat("...")
                .concat(whitelistedAsset.asset.issuer.substr(-3))})
            </a>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .maheke-governance-proposal-info-container {
    width: 25%;
    background: transparent
      linear-gradient(328deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0%
      no-repeat padding-box;
    opacity: 0.6;
    box-shadow: inset 1px 1px 2px #ffffff4d;
    border-radius: 25px;
    opacity: 1;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 10px 25px 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
  }
  .maheke-governance-proposal-info-title {
    width: 70%;
    height: 28px;
    text-align: left;
    font: 18px;
    margin: 0;
  }

  .maheke-governance-proposal-start-date-container {
    width: 100%;
    height: 70px;
  }
  .maheke-governance-proposal-start-date {
    margin: 0;
  }
  .maheke-governance-proposal-end-date-container {
    width: 100%;
    height: 70px;
  }
  .maheke-governance-proposal-end-date {
    margin: 0;
  }
  .maheke-governance-proposal-information-label {
    font-weight: bolder;
    font-size: 12px;
    margin: 30px 0px 8px;
  }
  .maheke-governance-proposal-accepted-assets-container {
    width: 100%;
    height: max-content;
  }
  .maheke-governance-accepted-assets-list {
    margin: 0;
    padding: 0;
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
  .maheke-governance-accepted-asset-item {
    margin-left: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  @media (max-width: 1024px) {
    .maheke-governance-proposal-info-container {
      width: 100%;
      justify-content: space-between;
      padding: 20px 25px;
      margin: 10px 0px;
      box-sizing: border-box;
    }
  }
</style>
