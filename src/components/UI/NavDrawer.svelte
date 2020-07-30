<script>
    import { fly, fade } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let drawerVisible;

    const handleOverlayClick = () => {
        dispatch('overlayClicked', drawerVisible)
    }

</script>

<style>
	.menu {
		list-style-type: none;
	}

    .menu > li {
        line-height: 4.8rem;
        margin-left : 1.5rem;
        font-size: 2rem;
    }

    .menu > li > a {
        color: #000;
        z-index: 401;
        text-decoration: none;
    }

    .drawer {
        transform: translateX(-100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFF;
        min-width: 350px;
        position: fixed;
        left: 0;
        top: 0;  
        height: 105%;   
        z-index: 400;
        padding: 2rem 2rem 0 5rem;
        transition: all .5s ease-in-out;
    }

    .drawer.drawer-menu {
        align-items: flex-end;
    }

    .drawer.open {
        transform: translateX(0%);
    }

	.drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index:395;
    }
    
    @media only screen and (max-width: 960px) {
        .drawer {
            height: unset;
            min-height: 350px;
            min-width: 100%;
            margin-top: 4rem;
            transform: translateY(-100%);
            border-radius: 3px;
            padding: 4rem 0 0 0;
        }

        .drawer.drawer-menu {
        align-items: center;
    }

        .drawer.open {
            transform: translateY(0%);
        }
    }

</style>

{#if drawerVisible}
    <div class="drawer-overlay"  on:click={handleOverlayClick} transition:fade></div>
{/if}

<div class="drawer drawer-menu" class:open={drawerVisible === "menu"}>
    <ul class="menu">
        <li><a href="https://www.pubmeeple.com" target="_blank" rel="noopener">Pub Meeple Home</a></li>
        <li><a href="https://topnine.pubmeeple.com" target="_blank" rel="noopener">Top Nine Generator</a></li>
        <li><a href="https://www.pubmeeple.com/pub-meeple-podcast" target="_blank" rel="noopener">Podcast</a></li>
        <li><a href="https://www.pubmeeple.com/contact" target="_blank" rel="noopener">Contact</a></li>
    </ul>
</div>

<div class="drawer" class:open={drawerVisible === 'account'}>
    <h2>Account</h2>
</div>

<div class="drawer" class:open={drawerVisible === 'help'}>
    <h2>Help</h2>
</div>


