<script>
  import dotsIcon from "@/assets/svg/dots-more-icon.svg";
  import { language } from "@/lib/store/store";

  let isFooterVisible = false;

  function toggleFooter() {
    isFooterVisible = !isFooterVisible;
  }
</script>

<footer class="maheke-governance gov-footer">
  <button on:click={toggleFooter} class="maheke-governance expand-button">
    <img class="maheke-governance expand-icon" src={dotsIcon} alt="dots" />
  </button>
  <div
    class="maheke-governance footer-column-center {isFooterVisible
      ? 'display-footer'
      : ''}"
  >
    <h4>{$language.SITEMAP}</h4>
    <a class="maheke-governance footer-anchor-hover" href="">{$language.HOME}</a
    >
    <a class="maheke-governance footer-anchor-hover" href=""
      >{$language.ABOUT.charAt(0)}{$language.ABOUT.slice(1).toLowerCase()}</a
    >
  </div>
  <div
    class="maheke-governance footer-column-center {isFooterVisible
      ? 'display-footer'
      : ''}"
  >
    <h4>{$language.GITHUB}</h4>
    <a
      class="maheke-governance footer-anchor-hover"
      href="https://github.com/maheke">{$language.MAHEKE}</a
    >
  </div>
  <div
    class="maheke-governance footer-column-center {isFooterVisible
      ? 'display-footer'
      : ''}"
  />
  <div
    class="maheke-governance footer-column-center {isFooterVisible
      ? 'display-footer'
      : ''}"
  >
    <h4>{$language.STAY_IN_TOUCH}</h4>

    <a
      class="maheke-governance footer-anchor-hover"
      href="https://x.com/mahekegov">{$language.X}</a
    >
  </div>
</footer>

<style>
  .maheke-governance.expand-icon {
    display: none;
  }

  .maheke-governance.gov-footer {
    width: 100%;
    background: rgba(52, 12, 104, 0.5) 0% 0% no-repeat padding-box;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  .maheke-governance.gov-footer div:last-child {
    margin-bottom: 0;
  }

  .maheke-governance.img-container {
    max-width: 400px;
    height: 260px;
  }

  .maheke-governance.footer-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 29px;
    color: #ffffff;
    margin-bottom: 59px;
    margin-top: calc(60px - 23px);
  }

  .maheke-governance.footer-column-center h4 {
    font-size: 18px;
    font-weight: 400;
  }

  .maheke-governance.footer-anchor-hover {
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 200;
  }

  .maheke-governance.footer-anchor-hover:hover {
    color: #1bfeac;
  }

  .maheke-governance.footer-anchor-hover:active {
    color: #026b9f;
  }

  .maheke-governance.footer-column-center img {
    height: 48px;
  }

  .maheke-governance.footer-anchor {
    color: #1bfeac;
  }

  .maheke-governance.expand-button {
    border: none;
    background: none;
    display: none;
  }

  @media (max-width: 768px) {
    .maheke-governance.expand-button {
      display: block;
    }

    .maheke-governance.expand-icon {
      display: block;
      height: 24px;
      filter: brightness(0) invert(1);
      margin-top: 44px;
      margin-bottom: 40px;
    }

    .maheke-governance.gov-footer {
      flex-direction: column;
      align-items: center;
    }

    .maheke-governance.footer-column-center {
      align-items: center;
      margin-bottom: 40px;
      margin-top: 0px;
      display: none;
    }

    .maheke-governance.maheke-governance.img-container {
      height: 150px;
    }

    .maheke-governance.footer-column-center:last-child {
      display: flex;
      width: 64%;
      align-items: flex-start;
      font-size: 12px;
    }

    .maheke-governance.footer-column-center h4 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    .maheke-governance.display-footer {
      display: flex;
    }
  }
</style>
