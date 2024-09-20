<div class="maheke-governance-proposal-container">
    <div class="maheke-governance-index-proposal-loading-info" />
    <div class="maheke-governance-proposal-details-container loading-info" />
    <div class="maheke-governance-proposal-vote-container loading-info" />
</div>
<div class="maheke-governance-proposal-info-container">
    <div class="maheke-governance-proposal-info loading-info" />
    <div class="maheke-governance-proposal-info loading-info" />
    <div class="maheke-governance-proposal-info loading-info" />
    <div class="maheke-governance-proposal-info loading-info" />
</div>

<style>
    .maheke-governance-proposal-container {
        border-radius: 25px;
        width: 65%;
        padding: 30px 30px;
        background: transparent linear-gradient(302deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0% no-repeat
            padding-box;
        opacity: 0.6;
        box-shadow: inset 1px 1px 2px #ffffff4d;
        opacity: 1;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50px 2fr 1fr;
        grid-gap: 15px;
        grid-template-areas:
            'id'
            'details'
            'vote-container';
        min-height: 420px;
    }
    .maheke-governance-proposal-details-container {
        grid-area: details;
    }
    .maheke-governance-proposal-vote-container {
        grid-area: vote-container;
    }
    .maheke-governance-proposal-info-container {
        width: 20%;
        margin: 0px 10px;
        background: transparent linear-gradient(328deg, #c251ff33 0%, #96e1ff80 52%, #1affabbf 100%) 0% 0% no-repeat
            padding-box;
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

    .loading-info {
        opacity: 0.3;
        cursor: progress;
        border-radius: 25px;
        background: linear-gradient(0.3turn, #fff, transparent, #fff);
        animation: 1s shine linear infinite;
    }
    .maheke-governance-index-proposal-loading-info {
        opacity: 0.3;
        cursor: progress;
        border-radius: 25px;
        background: linear-gradient(0.3turn, #fff, transparent, #fff);
        animation: 1s shine linear infinite;
    }
    .maheke-governance-proposal-info {
        width: 110%;
        height: 20%;
    }

    @media (max-width: 1024px) {
        .maheke-governance-proposal-container {
            width: 90%;
        }
        .maheke-governance-proposal-info-container {
            width: 90%;
            margin: 10px 0px;
        }
    }
</style>
