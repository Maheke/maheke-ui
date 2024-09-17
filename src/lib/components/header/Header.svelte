<script lang="ts">
  import HamburgerMenu from "./HamburgerMenu.svelte";
  import {
    isConnectMenuVisible,
    isHamburgerMenuVisible,
    isMenuVisible,
  } from "./headerStore";
  import expandIcon from "@/assets/svg/expand_more.svg";
  import languageIconHover from "@/assets/svg/expand_more.svg";
  import languageIcon from "@/assets/svg/language.svg";
  import mahekeLogo from "@/assets/svg/maheke-logo.webp";
  import clickOutside from "@/helpers/clickOutside";
  import { openConnectWindow } from "@/helpers/simpleSignerHelper";
  import LanguageInputs from "@/lib/components/language/LanguageInputs.svelte";
  import {
    activeLanguage,
    language,
  } from "@/lib/components/language/languageStore";
  import { publicKey } from "@/lib/store/store";

  let isConnectArrowHover = false;
  let isLanguageHover = false;

  function hideMenu() {
    $isMenuVisible = false;
    $isHamburgerMenuVisible = false;
    $isConnectMenuVisible = false;
  }

  function showLanguageHoverClass() {
    isLanguageHover = true;
  }

  function hideLanguageHoverClass() {
    isLanguageHover = false;
  }

  function toggleMenu() {
    $isMenuVisible = !$isMenuVisible;
    $isHamburgerMenuVisible = false;
  }

  function toggleConnectMenu() {
    $isConnectMenuVisible = !$isConnectMenuVisible;
  }

  function logout() {
    $publicKey = "";
  }
</script>

<header
  class="maheke-governance header-container row-space-between-center header-border"
>
  <div class="maheke-governance logo-container">
    <a href={import.meta.env.VITE_UI}>
      <img
        class="maheke-governance maheke-dao-logo"
        src={mahekeLogo}
        alt="Maheke Logo"
      />
    </a>
  </div>

  <div
    class="maheke-governance connect-language-container row-space-between-center"
    use:clickOutside={hideMenu}
  >
    <div class="maheke-governance connect-btn-container">
      {#if $publicKey}
        <p class="maheke-governance-connected" on:click={toggleConnectMenu}>
          {$publicKey.slice(0, 3).concat("...").concat($publicKey.substr(-3))}
          <img
            class="maheke-governance connect-expand-icon {isConnectArrowHover ||
            $isConnectMenuVisible
              ? 'expand-hover'
              : ''}"
            src={expandIcon}
            alt="expand"
          />
        </p>
        <div
          class="maheke-governance connect-selector-container column-center-flex-start {$isConnectMenuVisible
            ? 'show-menu'
            : ''}"
        >
          <button
            class="maheke-governance logout-button"
            on:click={() => {
              logout();
            }}
          >
            {$language.DISCONNECT}
          </button>
        </div>
      {:else}
        <button
          class="maheke-governance-connect-btn"
          on:click={() => openConnectWindow()}
          type="button"
        >
          {$language.CONNECT}
        </button>
      {/if}
    </div>
    <div class="maheke-governance connect-language row-space-between-center">
      <div class="maheke-governance column-center">
        <button
          class="maheke-governance language-button-container hide-button"
          on:click={toggleMenu}
          on:focus={showLanguageHoverClass}
          on:blur={hideLanguageHoverClass}
        >
          <div
            class="maheke-governance language-icon-container"
            on:mouseenter={showLanguageHoverClass}
            on:mouseleave={hideLanguageHoverClass}
          >
            <img
              class="maheke-governance language-icon"
              src={isLanguageHover || $isMenuVisible
                ? languageIconHover
                : languageIcon}
              alt="language"
            />
            <p
              class="maheke-governance language-selector-paragraph {isLanguageHover ||
              $isMenuVisible
                ? 'paragraph-hover'
                : ''}"
            >
              {$activeLanguage.toUpperCase()}
            </p>
            <img
              class="maheke-governance expand-icon {isLanguageHover ||
              $isMenuVisible
                ? 'expand-hover'
                : ''}"
              src={expandIcon}
              alt="expand"
            />
          </div>
          <div
            class="maheke-governance language-selector-container column-center-flex-start {$isMenuVisible
              ? 'show-menu'
              : ''}"
          >
            <LanguageInputs
              languageInputsProps={[
                { iso: $language.SPANISH_ISO, text: $language.SPANISH },
                { iso: $language.ENGLISH_ISO, text: $language.ENGLISH },
                { iso: $language.PORTUGUESE_ISO, text: $language.PORTUGUESE },
              ]}
            />
          </div>
        </button>
      </div>
    </div>
    <HamburgerMenu />
  </div>
</header>

<style>
  .maheke-governance.logout-button {
    background: none;
    border: none;
    font-weight: 700;
    opacity: 60%;
    cursor: pointer;
  }

  .maheke-governance.language-button-container {
    position: relative;
  }

  .maheke-governance-connected {
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 24px;
    width: 136px;
    height: 35px;
    font-weight: bold;
    border: none;
    margin-right: 44px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .maheke-governance-connected:hover,
  .maheke-governance-connect-btn:hover {
    background: #00ffff 0% 0% no-repeat padding-box;
    box-shadow: inset 0px 0px 6px #ffffff, 0px 0px 10px #00ffff80;
    transition: background 0.2s ease;
  }

  .maheke-governance-connect-btn {
    background: #f3f4fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 24px;
    width: 136px;
    height: 35px;
    font-weight: bold;
    border: none;
    margin-right: 44px;
    cursor: pointer;
  }

  .maheke-governance.language-input-paragraph {
    margin: 0;
    margin-right: 12px;
    margin-left: 12px;
    font-weight: bold;
    font-size: 12px;
  }

  .maheke-governance.maheke-dao-logo {
    height: 50px;
  }

  .maheke-governance.hide-button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
  }

  .maheke-governance.default-page a:hover {
    color: #1bfeac;
  }

  .maheke-governance.language-label.language-default:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .maheke-governance.language-active {
    color: #1bfeac;
  }

  .maheke-governance.language-default {
    color: #ffffff;
  }

  .maheke-governance.language-label {
    cursor: pointer;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    height: 25px;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
  }

  .maheke-governance.show-menu {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .maheke-governance.language-icon {
    position: absolute;
    margin-right: 60px;
    height: 21px;
    width: 21px;
  }
  .maheke-governance.connect-expand-icon {
    height: 21px;
    width: 21px;
  }

  .maheke-governance.expand-icon {
    position: absolute;
    margin-left: 55px;
    height: 21px;
    width: 21px;
    filter: invert(100%) sepia(0%) saturate(7496%) hue-rotate(347deg)
      brightness(99%) contrast(103%);
  }

  .maheke-governance.language-icon-container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90px;
    height: 21px;
    align-items: center;
  }

  .maheke-governance.expand-hover {
    filter: invert(68%) sepia(54%) saturate(622%) hue-rotate(100deg)
      brightness(112%) contrast(99%);
  }

  .maheke-governance.language-selector-paragraph {
    position: absolute;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
  }

  .maheke-governance.paragraph-hover {
    color: #1bfeac;
  }

  .maheke-governance.language-label:first-child {
    margin-top: 15px;
  }

  .maheke-governance.language-selector-container {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    top: 25px;
    right: 12px;
    background: rgba(255, 255, 255, 0.15) 0% 0% no-repeat padding-box;
    backdrop-filter: blur(7px);
    box-shadow: inset 1px 1px 1px #ffffff4d;
    border-radius: 8px;
    transition: opacity 0.2s;
  }
  .maheke-governance.connect-selector-container {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    width: 139px;
    height: 45px;
    z-index: 1;
    top: 66px;
    background: #ffffff 0% 0% no-repeat padding-box;
    backdrop-filter: blur(7px);
    box-shadow: inset 1px 1px 1px #ffffff4d;
    border-radius: 8px;
    transition: opacity 0.2s;
  }

  .maheke-governance.column-center-justify {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .maheke-governance.header-container {
    height: 90px;
    width: calc(100% - 2px);

    position: fixed;
    z-index: 1;
  }

  .maheke-governance.header-border {
    backdrop-filter: blur(7px);
    border-bottom: 1px solid rgba(0, 255, 255, 0.15);
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.15);
  }

  .maheke-governance.logo-container {
    margin-left: 49px;
  }

  .maheke-governance.header-nav-container {
    text-transform: uppercase;
  }

  .maheke-governance.header-nav-container a {
    text-decoration: none;
    font-size: 15px;
    color: #ffffff;
    letter-spacing: 0px;
  }

  .maheke-governance.header-nav-container div:last-child {
    margin: 0;
  }

  .maheke-governance.current-page::after {
    display: block;
    content: "";
    position: absolute;
    background: rgba(230, 246, 255, 0.15) 0% 0% no-repeat padding-box;
    box-shadow: inset 1px 1px 1px #ffffff4d;
    border-radius: 20px;
    height: 38px;
    width: 151px;
    margin: 0px;
  }

  .maheke-governance.header-nav-container div {
    margin-right: 86px;
  }

  .maheke-governance.connect-language-container {
    margin-right: 39px;
  }

  @media (max-width: 1365px) {
    nav {
      display: none;
    }
    .connect-btn-container {
      display: none;
    }
    .expand-icon,
    .language-selector-paragraph {
      display: none;
    }

    .maheke-governance.language-selector-container.show-menu {
      right: 20px;
    }

    .maheke-governance.language-icon-container {
      width: auto;
    }

    .maheke-governance.connect-language-container {
      margin-right: 33px;
      width: 29px;
    }

    .maheke-governance.language-icon {
      height: 25px;
      width: 25px;
    }
  }

  @media (max-width: 768px) {
    .maheke-governance.header-container {
      position: relative;
    }
  }

  @media (max-width: 490px) {
    .connect-btn-container {
      display: none;
    }
    .maheke-governance.logo-container {
      margin-left: 16px;
    }
  }
</style>
