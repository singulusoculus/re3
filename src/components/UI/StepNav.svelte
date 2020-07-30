<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { step } from '../stores/step';

    const dispatch = createEventDispatcher();

    export let currentStep: string;

</script>

<style>
    .step-nav-wrapper {
        display: flex;
        justify-content: center;
    }

    nav {
        position: relative;
        width: 50rem;
        height: 5rem;
        background: var(--color-secondary);
        border-radius: 8px;
        font-size: 0;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.5);
    }

    nav a {
        font-size: 1.5rem;
        text-transform: uppercase;
        color: white;
        text-decoration: none;
        line-height: 5rem;
        position: relative;
        z-index: 1;
        display: inline-block;
        text-align: center;
    }

    nav .animation {
        position: absolute;
        /* height: 100%;
        top: 0; */
        height: .5rem;
        bottom: 0;
        z-index: 0;
        background: #fff;
        width: 12.5rem;
        border-radius: 8px;
        transition: all .5s ease 0s;
    }

    a:nth-child(1) {
        width: 12.5rem;
    }

    nav a:nth-child(1).current~.animation {
        width: 12.5rem;
        left: 0;
    }

    a:nth-child(2) {
        width: 12.5rem;
    }

    nav a:nth-child(2).current~.animation {
        width: 12.5rem;
        left: 12.5rem;
    }

    a:nth-child(3) {
        width: 12.5rem;
    }

    nav a:nth-child(3).current~.animation {
        width: 12.5rem;
        left: 25rem;
    }

    a:nth-child(4) {
        width: 12.5rem;
    }

    nav a:nth-child(4).current~.animation {
        width: 12.5rem;
        left: 37.5rem;
    }

    @media only screen and (max-width: 550px) {
        nav {
            width: 98%;
        }

        nav .animation {
            position: absolute;
            width: 25%;
            height: .3rem;
        }

        a:nth-child(1) {
            width: 25%;
        }

        nav a:nth-child(1).current~.animation {
            width: 25%;
            left: 0;
        }

        a:nth-child(2) {
            width: 25%;
        }

        nav a:nth-child(2).current~.animation {
            width: 25%;
            left: 25%;
        }

        a:nth-child(3) {
            width: 25%;
        }

        nav a:nth-child(3).current~.animation {
            width: 25%;
            left: 50%;
        }

        a:nth-child(4) {
            width: 25%;
        }

        nav a:nth-child(4).current~.animation {
            width: 25%;
            left: 75%;
        }
    }



</style>

<div class="step-nav-wrapper">
    <nav>
        <a href="#" class:current={currentStep === 'start'} on:click={() => dispatch('stepClick', 'start')}>Start</a>
        <a href="#" class:current={currentStep === 'list'} on:click={() => dispatch('stepClick', 'list')}>List</a>
        <a href="#" class:current={currentStep === 'rank'} on:click={() => dispatch('stepClick', 'rank')}>Rank</a>
        <a href="#" class:current={currentStep === 'result'} on:click={() => dispatch('stepClick', 'result')}>Result</a>
        <div class="animation"></div>
    </nav>
</div>

