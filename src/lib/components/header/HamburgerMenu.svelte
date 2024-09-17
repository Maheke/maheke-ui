<script>
  import hamburgerMenu from "../../../assets/svg/hamburger-menu.svg";
  import hamburgerIconHover from "../../../assets/svg/hamburger-menu-hover.svg";
  import { isMenuVisible, isHamburgerMenuVisible } from "./headerStore";
  import { openConnectWindow } from "@/helpers/simpleSignerHelper";
  import { publicKey } from "../../../lib/store/store";
  import { language } from "../language/languageStore";

  function toggleHamburgerMenu() {
    $isHamburgerMenuVisible = !$isHamburgerMenuVisible;
    $isMenuVisible = false;
  }
  function logout() {
    $publicKey = "";
  }
</script>

<button
  on:click={toggleHamburgerMenu}
  class="maheke-governance hamburger-menu-container hide-button"
>
  <div class="maheke-governance hamburger-icon-container width-auto">
    <img
      class="maheke-governance hamburger-icon"
      src={$isHamburgerMenuVisible ? hamburgerIconHover : hamburgerMenu}
      alt="hamburger menu"
    />
  </div>
  <div
    class="maheke-governance hamburger-selector-container column-center-flex-start {$isHamburgerMenuVisible
      ? 'show-menu'
      : ''}"
  >
    <a href="" class="maheke-governance hamburger-default hamburger-label">
      {$language.FAQ}
    </a>
    <a href="" class="maheke-governance hamburger-default hamburger-label">
      {$language.ABOUT}
    </a>
    <a href="" class="maheke-governance hamburger-default hamburger-label">
      {$language.CONTACT}
    </a>
    {#if $publicKey}
      <hr class="maheke-governance connect-separator" />
      <a
        href="#"
        class="maheke-governance hamburger-default hamburger-label"
        on:click={() => {
          logout();
        }}
      >
        {$language.DISCONNECT}
        {$publicKey.slice(0, 3).concat("...").concat($publicKey.substr(-3))}
      </a>
    {:else}
      <hr class="maheke-governance connect-separator" />
      <a
        href="#"
        class="maheke-governance hamburger-default hamburger-label"
        on:click={() => openConnectWindow()}
        type="button"
      >
        {$language.CONNECT}
      </a>
    {/if}
  </div>
</button>

<style>
  .maheke-governance.connect-separator {
    width: 70%;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }

  .maheke-governance.hide-button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
  }

  .maheke-governance.hamburger-label.hamburger-default:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .maheke-governance.hamburger-default {
    color: #ffffff;
  }

  .maheke-governance.hamburger-label {
    text-decoration: none;
    cursor: pointer;
    margin-bottom: 15px;
    margin-left: 24px;
    margin-right: 24px;
    font-size: 12px;
    height: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    padding: 0px 5px;
  }

  .maheke-governance.hamburger-icon {
    height: 21px;
    width: 21px;
  }
  .maheke-governance.hamburger-icon-container.width-auto {
    width: auto;
  }

  .maheke-governance.hamburger-icon-container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;

    height: 21px;
    align-items: center;
  }

  .maheke-governance.hamburger-label:first-child {
    margin-top: 15px;
  }

  .maheke-governance.hamburger-selector-container {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    top: 25px;
    right: 3px;
    background: rgba(255, 255, 255, 0.15) 0% 0% no-repeat padding-box;
    backdrop-filter: blur(7px);
    box-shadow: inset 1px 1px 1px #ffffff4d;
    border-radius: 8px;
    transition: opacity 0.2s;
    box-sizing: border-box;
  }

  .maheke-governance.show-menu {
    opacity: 1;
    visibility: visible;
  }

  .maheke-governance.hamburger-menu-container {
    position: relative;
  }

  @media (min-width: 1366px) {
    .maheke-governance.hamburger-menu-container {
      display: none;
    }
  }

  @media (max-width: 1366px) {
    .maheke-governance.hamburger-icon {
      height: 30px;
      width: 30px;
    }
  }
</style>
