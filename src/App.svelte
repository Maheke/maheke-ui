<script lang="ts">
  import { handleSimpleSignerMessage } from "@/helpers/simpleSignerHelper";
  import Footer from "@/lib/components/footer/Footer.svelte";
  import Header from "@/lib/components/header/Header.svelte";
  import { isLanguageLoading } from "@/lib/store/store";
  import Community from "@/routes/community/Community.svelte";
  import { Route, Router } from "svelte-navigator";

  window.addEventListener("message", handleSimpleSignerMessage);
</script>

<Router primary={false}>
  <main>
    {#if !$isLanguageLoading}
      <Header />
      <Route path="/" component={Community} />
      <Footer />
    {/if}
  </main>
</Router>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }

  :global(#app) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  :global(body) {
    min-height: 100vh;
    background: transparent linear-gradient(180deg, #0b0312 0%, #dacb01 100%) 0%
      0% no-repeat padding-box;
  }

  :global(#app) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  :global(.maheke-governance.hide-circle) {
    margin: 0;
    padding: 0;
    border: none;
    appearance: none;
  }

  :global(.column-center-flex-start) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  :global(.maheke-governance.section-title) {
    font-size: 36px;
    color: #ffffff;
    font-weight: 500;
    text-align: center;
  }

  :global(.maheke-governance.section-paragraph) {
    font-size: 18px;
    color: #ffffff;
    text-align: center;
  }

  :global(.maheke-governance.section-anchor) {
    color: #1bfeac;
  }

  :global(.maheke-governance.row-space-between-center) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  :global(.flex-row-flex-start) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  :global(.maheke-governance.column-center) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  :global(.maheke-governance.row-space-between-flex-start) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    text-transform: uppercase;
    font-weight: bold;
  }

  :global(.maheke-governance.gov-button) {
    border: none;
    border-radius: 50px;
    box-shadow: 0px 6px 12px #00000029;
    background: #00ffff 0% 0% no-repeat padding-box;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
  }

  :global(.maheke-governance.gov-button:hover) {
    box-shadow: inset 0px 0px 12px #ffffff, 0px 0px 18px #00ffff80;
  }

  :global(.maheke-governance.gov-button:active) {
    background-color: #026b9f;
    box-shadow: 0px 6px 12px #00000029;
    color: #59d5e9;
  }

  :global(*) {
    font-family: "Montserrat";
  }
</style>
