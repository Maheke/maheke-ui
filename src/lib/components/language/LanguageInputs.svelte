<script lang="ts">
    import type ILanguageInputProps from './ILanguageInputProps';
    import { changeLanguage } from './languageHelpers';
    import { activeLanguage, detectedLanguage } from './languageStore';

    $: if ($activeLanguage === '') {
        $activeLanguage = $detectedLanguage;
    } else {
        changeLanguage($activeLanguage);
    }
    export let languageInputsProps: ILanguageInputProps[];
</script>

{#each languageInputsProps as language}
    <label
        class="maheke-governance language-label {$activeLanguage === language.iso ? 'active' : 'default'}"
        on:change={() => changeLanguage($activeLanguage)}
    >
        <input
            class="maheke-governance hide-circle"
            bind:group={$activeLanguage}
            value={language.iso}
            type="radio"
            name="language"
        />
        {language.text.toUpperCase()}
    </label>
{/each}

<style>
    .maheke-governance.language-label:hover {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 0px 5px;
    }
    .maheke-governance.language-label.active {
        color: #1bfeac;
    }

    .maheke-governance.language-label:first-child {
        margin-top: 15px;
    }
    .maheke-governance.language-label {
        cursor: pointer;
        margin-bottom: 15px;
        margin-left: 10px;
        margin-right: 10px;
        height: 25px;
        font-size: 12px;
        color: #ffffff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
        box-sizing: border-box;
    }
</style>
