<script lang="ts">
  import infoIcon from "@/assets/svg/info-icon.svg";
  import { language } from "@/lib/components/language/languageStore";
  import "@lottiefiles/lottie-player";

  export let operationHash: string;

  function closeModal() {
    window.location.href = "/";
  }
</script>

<div class="maheke-governance-proposal-creation-confirmation-modal">
  <div>
    <lottie-player
      src="https://assets1.lottiefiles.com/packages/lf20_dung2sfv.json"
      background="transparent"
      speed="1"
      style="width: 120px; height: 120px;"
      autoplay
    />
  </div>
  <div>{$language.PROPOSAL_SUCCESS}</div>
  <div class="maheke-governance-hash-operation-alert">
    <img class="maheke-governance-info-icon" src={infoIcon} alt="info icon" />
    <span>
      <strong> {$language.OPERATION_HASH} </strong>{operationHash
        .slice(0, 10)
        .concat("...")
        .concat(operationHash.substr(-10))}</span
    >
  </div>
  <button class="maheke-governance-modal-ok-btn" on:click={closeModal}
    >{$language.OK}</button
  >
</div>

<style>
  .maheke-governance-proposal-creation-confirmation-modal {
    width: 420px;
    height: 300px;
    top: 100px;
    left: 35%;
    padding: 20px 20px 30px;
    position: fixed;
    background: #eff0f2 0% 0% no-repeat padding-box;
    box-shadow: 3px 32px 32px #00000029;
    border-radius: 10px;
    z-index: 5;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .maheke-governance-info-icon {
    height: 16px;
    margin-right: 8px !important;
  }
  .maheke-governance-hash-operation-alert {
    height: min-content;
    width: 100%;
    box-sizing: border-box;
    background: #c9e0ee 0% 0% no-repeat padding-box;
    border-radius: 10px;
    padding: 6px 10px;
    opacity: 1;
    word-break: break-all;
    text-align: left;
    font: normal normal normal 14px/18px Montserrat;
    letter-spacing: 0.14px;
    color: #166b80;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .maheke-governance-modal-ok-btn {
    min-width: 85px;
    width: 40%;
    height: 48px;
    letter-spacing: 0.14px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #023047;
    background: var(--primary-btn) 0% 0% no-repeat padding-box;
    border-radius: 50px;
    opacity: 1;
    border: none;
    background: #00ffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000029;
  }

  @media (max-width: 1024px) {
    .maheke-governance-proposal-creation-confirmation-modal {
      top: 150px;
      left: 25%;
      max-width: 400px;
      padding: 20px 15px;
    }
  }
  @media (max-width: 520px) {
    .maheke-governance-proposal-creation-confirmation-modal {
      top: 90px;
      left: 15%;
      max-width: 280px;
      padding: 20px 10px;
    }

    .maheke-governance-modal-ok-btn {
      min-width: 100px;
    }
  }
  @media (max-width: 340px) {
    .maheke-governance-proposal-creation-confirmation-modal {
      left: 3%;
    }
  }
</style>
