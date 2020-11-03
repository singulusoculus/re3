<script>
    import { createEventDispatcher } from 'svelte'

    export let label = null
    export let id
    export let icon = null
    export let placeholder = null
    export let type = ''

    let dispatch = createEventDispatcher()

    export let text = ''
    
    $: isFilled = text.length > 0 ? true : false
    $: lineCount = text.split(/\r*\n/).length
    $: textareaSize = resizeTextarea(lineCount)


    const resizeTextarea = (count) => {

        dispatch('textChange', text)

        if (count === 1) {
            return 20
        } else if ( count > 14) {
            return 259
        } else {
            return 25 + ((count-1) * 18)
        }
    }

</script>

<style>
    .input-field {
        position: relative;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-size: 1.6rem;
        flex: 1 0 auto;
    }

    input:not([type]), input[type=text]:not(.browser-default), 
    /* input[type=password]:not(.browser-default), 
    input[type=email]:not(.browser-default), 
    input[type=url]:not(.browser-default), 
    input[type=time]:not(.browser-default), 
    input[type=date]:not(.browser-default), 
    input[type=datetime]:not(.browser-default), 
    input[type=datetime-local]:not(.browser-default), 
    input[type=tel]:not(.browser-default), 
    input[type=number]:not(.browser-default), 
    input[type=search]:not(.browser-default),  */
    textarea.material-textarea {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 3rem;
        width: 100%;
        font-size: 16px;
        margin: 0 0 8px 0;
        padding: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-transition: border .3s, -webkit-box-shadow .3s;
        transition: border .3s, -webkit-box-shadow .3s;
        transition: box-shadow .3s, border .3s;
        transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;
    }

    .input-field > label {
        color: #9e9e9e;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1.4rem;
        cursor: text;
        -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
        text-align: initial;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }

    input:focus+label {
        -webkit-transform: translateY(-14px) scale(0.8);
        transform: translateY(-14px) scale(0.8);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        color: var(--color-primary)
    }

    input:focus {
        border-bottom: 1px solid var(--color-primary);
    }

    label.is-filled {
        -webkit-transform: translateY(-14px) scale(0.8);
        transform: translateY(-14px) scale(0.8);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }

    .text-input {
        display: flex;
        align-items: center ;
    }

    i {
        margin-right: 1rem;
    }

    /* TEXT AREA */

    textarea {
        line-height: normal;
        overflow-y: hidden;
        padding: .8rem 0 .8rem 0;
        resize: none;
        min-height: 3rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: auto;
    }

    textarea:focus+label {
        -webkit-transform: translateY(-14px) scale(0.8);
        transform: translateY(-14px) scale(0.8);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        color: var(--color-primary)
    }

    textarea + label {
        color: #9e9e9e;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1rem;
        cursor: text;
        -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
        text-align: initial;
        -webkit-transform: translateY(12px);
        transform: translateY(12px);
    }

</style>

<div class="text-input">
    {#if icon}
        <i class="material-icons">{icon}</i>
    {/if}
    <div class="input-field">
        {#if type === 'textarea'}
            <textarea id="{id}" class="material-textarea" style="height:{textareaSize}px" bind:value={text} ></textarea>
        {:else}
            <input id="{id}" type="text" bind:value={text} placeholder="{placeholder}" on:input="{() => dispatch('textChange', text)}">
        {/if}
        {#if label}
            <label for="{id}" class:is-filled="{isFilled}">{label}</label>
        {/if}
    </div>
</div>