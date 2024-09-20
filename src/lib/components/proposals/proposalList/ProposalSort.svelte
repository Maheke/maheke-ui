<script lang="ts">
  import expandMoreIcon from "@/assets/svg/expand_more.svg";
  import clickOutside from "@/helpers/clickOutside";
  import { language } from "@/lib/components/language/languageStore";
  import type { ITranslation } from "@/lib/i18n/ITranslation";
  import { loading } from "@/lib/store/store";
  import { proposalsList, sort } from "@/routes/community/proposalListStore";

  $sort = "ALL";
  let isMenuVisible = false;
  function hideMenu() {
    isMenuVisible = false;
  }

  function toggleMenu() {
    if (!$loading) {
      isMenuVisible = !isMenuVisible;
    }
  }

  function sortProposals() {
    $proposalsList = $proposalsList.sort((proposal) => {
      return proposal.status === $sort ? -1 : 1;
    });
  }

  const sortOptions = [
    "ALL",
    "ACTIVE",
    "DRAW",
    "CLOSING",
    "CLOSED",
    "FOR",
    "AGAINST",
  ];
  export function getTranslation(text: string) {
    const translation = $language[text as keyof ITranslation];
    return translation;
  }
</script>

<div
  class="maheke-governance sort-proposals-button-container column-center"
  use:clickOutside={hideMenu}
>
  <button
    class="maheke-governance sort-proposals-button {isMenuVisible
      ? 'active'
      : ''}"
    on:click={toggleMenu}
  >
    <p class="maheke-governance sort-proposals-button-paragraph">
      {getTranslation($sort)}
    </p>
    <img
      class="maheke-governance sort-proposals-button-expand"
      src={expandMoreIcon}
      alt="expand"
    />
  </button>
  <div
    class="maheke-governance sort-menu {isMenuVisible
      ? 'column-center-flex-start'
      : 'hide-menu'}"
  >
    {#each sortOptions as option}
      <label
        on:change={() => {
          sortProposals();
        }}
      >
        <input
          class="maheke-governance hide-circle"
          bind:group={$sort}
          value={option}
          type="radio"
          name="sort"
        />
        <p class="maheke-governance sort-input-paragraph">
          {getTranslation(option)}
        </p>
      </label>
    {/each}
  </div>
</div>

<style>
  .maheke-governance.sort-input-paragraph {
    margin-right: 12px;
    margin-left: 12px;
    color: rgba(2, 48, 71, 0.6);
    font-weight: bold;
    text-transform: uppercase;
  }

  .maheke-governance.sort-menu label:first-child {
    margin-top: 8px;
  }

  .maheke-governance.sort-menu label {
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
  }

  .maheke-governance.sort-menu label:hover {
    background-color: rgba(52, 213, 219, 0.2);
  }

  .maheke-governance.sort-menu
    label:hover
    .maheke-governance.sort-input-paragraph {
    color: rgb(2, 48, 71);
    font-weight: bold;
  }

  .maheke-governance.sort-menu.hide-menu {
    opacity: 0;
    visibility: hidden;
  }

  .maheke-governance.sort-menu {
    font-weight: bold;
    font-size: 12px;
    background: white;
    position: absolute;
    z-index: 1;
    left: 17px;
    top: 31px;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .maheke-governance.sort-proposals-button-container {
    position: relative;
  }

  .maheke-governance.sort-proposals-button-expand {
    height: 18px;
    width: 18px;
  }

  .maheke-governance.sort-proposals-button-paragraph {
    margin: 0;
    margin-left: 5px;
    color: #023047;
  }

  .maheke-governance.sort-proposals-button {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 12px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    margin-left: 17px;
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000014;
    border-radius: 24px;
    height: 28px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .maheke-governance.sort-proposals-button:active {
    opacity: 0.5;
  }
</style>
