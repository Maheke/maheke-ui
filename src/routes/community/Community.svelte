<script>
  import { language } from "@/lib/components/language/languageStore";
  import { currentPage } from "@/lib/components/header/headerStore";
  import Proposals from "@/lib/components/proposals/proposalList/Proposals.svelte";
  $currentPage = "community";
</script>

<div class="maheke-governance container-max-height column-center">
  <section class="maheke-governance intro-section column-center">
    <h1 class="maheke-governance section-title">
      {$language.MAHEKE_GOVERNANCE}
    </h1>
    <p class="maheke-governance section-paragraph">
      {$language.JOIN_MAHEKE}
      <a class="maheke-governance section-anchor" href="/contact"
        >{$language.CONTACT_US}</a
      >
    </p>
  </section>
  <Proposals />
</div>

<style>
  .maheke-governance-projects-link {
    color: #1bfeac;
  }
  .maheke-governance-section {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 321px;
    color: #ffffff;
    margin-top: 156px;
  }
  .maheke-governance-section-title {
    font-size: 42px;
    margin-bottom: 50px;
  }
  .maheke-governance-section-paragraph-one,
  .maheke-governance-section-paragraph-two {
    font-size: 20px;
  }
  .maheke-governance-section-paragraph-one {
    margin-bottom: 15px;
  }
  .maheke-governance.intro-section {
    width: 70%;
    margin-top: 177px;
  }

  .maheke-governance.section-paragraph {
    font-size: 18px;
    color: #ffffff;
    margin-top: 40px;
  }

  .maheke-governance.discord-section {
    width: 70%;
  }

  @media (max-width: 1124px) {
    .maheke-governance.discord-section {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    .maheke-governance.intro-section {
      width: 90%;
      margin-top: 45px;
    }

    .maheke-governance.section-paragraph {
      margin: 0;
      margin-top: 0;
      font-weight: 300;
    }

    .maheke-governance.section-title {
      margin: 0;
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 30px;
    }
  }
</style>
