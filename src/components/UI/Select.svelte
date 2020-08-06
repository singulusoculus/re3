<script>
    import { fade } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    export let options = [];
    export let browserDefault = false;

    const dispatch = createEventDispatcher();

    let isOpen = false
    let selected

    $: selectedName = options.find(opt => opt.selected).name
    $: selectedValue = options.find(opt => opt.selected).value

    const toggleSelectOpen = () => {
        isOpen = !isOpen
    }

    const handleSelected = (newSelected) => {
        dispatch("changeSelection", newSelected)
    }

</script>

<style>
    .input-field {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .select-wrapper {
        position: relative;
    }

    .select-wrapper+label {
        position: absolute;
        top: -26px;
        font-size: .8rem;
    }

    .input-field>label {
        color: #9e9e9e;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1rem;
        cursor: text;
        transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
        text-align: initial;
        -webkit-transform: translateY(12px);
        transform: translateY(12px);
    }

    .select-wrapper .caret {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 0;
        fill: rgba(0,0,0,0.87);
    }

    select {
        background-color: rgba(255,255,255,0.9);
        width: 100%;
        padding: 5px;
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        height: 5rem;
        font-size: 1.6rem;
    }

    .select-wrapper input.select-dropdown {
        position: relative;
        cursor: pointer;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        outline: none;
        height: 3rem;
        line-height: 3rem;
        width: 100%;
        font-size: 2rem;
        margin: 0 0 8px 0;
        padding: 0;
        display: block;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 1;
    }

    .dropdown-content {
        background-color: #fff;
        margin: 0;
        /* display: none; */
        visibility: hidden;
        min-width: 100px;
        overflow-y: auto;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        list-style-type: none;
        padding-left: 0;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        transition: all .3s;
        overflow-y: auto;
    }

    .dropdown-content.open {
        display: block;
        width: 100%;
        left: 0;
        top: 0;
        opacity: 1;
        transform: scaleX(1) scaleY(1);
        visibility: visible;

    }

    .dropdown-content li {
        clear: both;
        color: rgba(0,0,0,0.87);
        cursor: pointer;
        min-height: 50px;
        line-height: 1.5rem;
        width: 100%;
        text-align: left;
        font-size: 1.5rem;
    }

    .select-dropdown.dropdown-content li.selected {
        background-color: rgba(0,0,0,0.03);
    }

</style>

<svelte:body on:click={isOpen ? toggleSelectOpen : null}/>

{#if !browserDefault}
<div class="input-field">
    <div class="select-wrapper">
        <input 
            type="text" 
            class="select-dropdown" 
            readonly="true" 
            on:click|stopPropagation={toggleSelectOpen} 
            data-selected-name={selectedName} 
            data-selected-value={selectedValue}>
        <ul class="select-options dropdown-content" class:open={isOpen}>
            {#each options as option}
                <li 
                    data-value="{option.value}" 
                    data-selected="{option.selected ? "true" : "false"}" 
                    on:click={() => handleSelected(option.value)}
                    class:selected={option.selected}>
                        {option.name} 
                </li>
            {/each}
        </ul>
        <svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
    </div>
    <!-- <label for="">Select</label> -->
</div>
{:else}
    <div class="input-field">
        <div class="select-wrapper">
            <select name="category-select" id="category-select" bind:value={selected} on:change={() => dispatch('changeSelection', selected)}>
                {#each options as option}
                    <option value={option}>{option.name}</option>
                {/each}
            </select>
        </div>
    </div>
{/if}
