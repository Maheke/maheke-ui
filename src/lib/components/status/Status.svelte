<script lang="ts">
    import type IStatus from 'src/lib/components/proposals/IStatus';

    import { language } from '../language/languageStore';

    export let status: IStatus['status'];
</script>

<p class="maheke-governance proposal-status column-center status-border {status.toLowerCase()}">
    {$language[status].toUpperCase()}
</p>

<style>
    .maheke-governance.status-border {
        box-shadow: 0px 3px 6px #00000014;
        border-radius: 6px;
    }

    .maheke-governance.active {
        background: #48b7d2 0% 0% no-repeat padding-box;
        height: 32px;
        width: 70px;
    }

    .maheke-governance.closing {
        background: #3c6275 0% 0% no-repeat padding-box;
        height: 32px;
        width: 70px;
    }

    .maheke-governance.closed {
        background: #233a46 0% 0% no-repeat padding-box;
        height: 32px;
        width: 70px;
    }

    .maheke-governance.draw {
        background: #afa988 0% 0% no-repeat padding-box;
        height: 32px;
        width: 70px;
    }

    .maheke-governance.for {
        background: #39bbae 0% 0% no-repeat padding-box;
        height: 32px;
        width: 95px;
    }

    .maheke-governance.against {
        background: #d68987 0% 0% no-repeat padding-box;
        height: 32px;
        width: 95px;
    }

    .maheke-governance.proposal-status {
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
    }

    @media (max-width: 730px) {
        .maheke-governance.proposal-status {
            margin: 0;
        }
    }
</style>
