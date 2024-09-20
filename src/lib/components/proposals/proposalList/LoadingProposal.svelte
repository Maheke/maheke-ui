<div class="maheke-governance skeleton-loading">
    <div class="maheke-governance skeleton-loading-title" />
    <div class="maheke-governance skeleton-loading-description" />
    <div class="maheke-governance skeleton-loading-status" />
</div>
<div class="maheke-governance skeleton-loading">
    <div class="maheke-governance skeleton-loading-title" />
    <div class="maheke-governance skeleton-loading-description" />
    <div class="maheke-governance skeleton-loading-status" />
</div>
<div class="maheke-governance skeleton-loading">
    <div class="maheke-governance skeleton-loading-title" />
    <div class="maheke-governance skeleton-loading-description" />
    <div class="maheke-governance skeleton-loading-status" />
</div>

<style>
    .maheke-governance.skeleton-loading {
        opacity: 0.3;
        cursor: progress;
        border-radius: 25px;
        background: linear-gradient(0.3turn, #fff, transparent, #fff);
        width: 100%;
        height: 234px;
        position: relative;
        margin-bottom: 19px;
    }

    .maheke-governance.skeleton-loading-description,
    .maheke-governance.skeleton-loading-title,
    .maheke-governance.skeleton-loading-status {
        opacity: 1.3;
        cursor: progress;
        border-radius: 25px;
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        background-size: 200% 100%;
        position: absolute;
        animation: 1s shine linear infinite;
        margin-left: 35px;
    }

    .maheke-governance.skeleton-loading-title {
        height: 30px;
        width: 310px;
        margin-top: 60px;
    }

    .maheke-governance.skeleton-loading-description {
        height: 20px;
        width: 235px;
        margin-top: 110px;
    }

    .maheke-governance.skeleton-loading-status {
        height: 30px;
        width: 80px;
        margin-top: 150px;
    }

    @keyframes shine {
        to {
            background-position-x: -200%;
        }
    }

    @media (max-width: 768px) {
        .maheke-governance.skeleton-loading {
            height: 337px;
        }

        .maheke-governance.skeleton-loading-title {
            width: 80px;
        }

        .maheke-governance.skeleton-loading-description {
            width: 190px;
            height: 30px;
            margin-top: 130px;
        }

        .maheke-governance.skeleton-loading-status {
            height: 21px;
            width: 138px;
            margin-top: 200px;
        }
    }
</style>
