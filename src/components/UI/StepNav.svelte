<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import currentStep  from '../../stores/currentStep';
    import enabledSteps from '../../stores/stepStatus';
    import listStore from '../../stores/list-store'

    const dispatch = createEventDispatcher();

    // let enabledSteps = enabledStepsStore
    // let currentStep = currentStepStore

    const handleStepClick = (step) => {
        if($enabledSteps[step]) {
            currentStep.set(step)
        }

        if(step === 'start') {
            enabledSteps.enableStart()
            listStore.clearStore()
        }
    }

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

    nav span {
        font-size: 1.5rem;
        text-transform: uppercase;
        color: white;
        /* text-decoration: none; */
        cursor: pointer;
        line-height: 5rem;
        position: relative;
        z-index: 1;
        display: inline-block;
        text-align: center;
    }

    nav .indicator {
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

    span:nth-child(1) {
        width: 12.5rem;
    }

    nav span:nth-child(1).current~.indicator {
        width: 12.5rem;
        left: 0;
    }

    span:nth-child(2) {
        width: 12.5rem;
    }

    nav span:nth-child(2).current~.indicator {
        width: 12.5rem;
        left: 12.5rem;
    }

    span:nth-child(3) {
        width: 12.5rem;
    }

    nav span:nth-child(3).current~.indicator {
        width: 12.5rem;
        left: 25rem;
    }

    span:nth-child(4) {
        width: 12.5rem;
    }

    nav span:nth-child(4).current~.indicator {
        width: 12.5rem;
        left: 37.5rem;
    }

    .disabled {
        color: var(--color-grey-dark-3);
        cursor:default;
    }

    @media only screen and (max-width: 550px) {
        nav {
            width: 98%;
        }

        nav .indicator {
            position: absolute;
            width: 25%;
            height: .3rem;
        }

        span:nth-child(1) {
            width: 25%;
        }

        nav span:nth-child(1).current~.indicator {
            width: 25%;
            left: 0;
        }

        span:nth-child(2) {
            width: 25%;
        }

        nav span:nth-child(2).current~.indicator {
            width: 25%;
            left: 25%;
        }

        span:nth-child(3) {
            width: 25%;
        }

        nav span:nth-child(3).current~.indicator {
            width: 25%;
            left: 50%;
        }

        span:nth-child(4) {
            width: 25%;
        }

        nav span:nth-child(4).current~.indicator {
            width: 25%;
            left: 75%;
        }
    }



</style>

<!-- <button on:click={() => enabledStore.toggleStep('list')}>Toggle List</button>
<button on:click={() => enabledStore.toggleStep('rank')}>Toggle Rank</button>
<button on:click={() => enabledStore.toggleStep('result')}>Toggle Result</button>
<button on:click={() => enabledStore.setSteps({start:true, list:false, rank:false, result:false})}>Set All</button>
<button on:click={() => step.set('list')}>Go to List</button>
<button on:click={() => enabledStore.enableList()}>Enable List</button>
<button on:click={() => enabledStore.enableRank()}>Enable Rank</button>
<button on:click={() => enabledStore.enableResult()}>Enable Result</button> -->

<div class="step-nav-wrapper">
    <nav>
        <span  class:current={$currentStep === 'start'} on:click={() => handleStepClick('start')}>Start</span>
        <span  class:disabled={!$enabledSteps.list} class:current={$currentStep === 'list'} on:click={() => handleStepClick('list')}>List</span>
        <span  class:disabled={!$enabledSteps.rank} class:current={$currentStep === 'rank'} on:click={() => handleStepClick('rank')}>Rank</span>
        <span  class:disabled={!$enabledSteps.result} class:current={$currentStep === 'result'} on:click={() => handleStepClick('result')}>Result</span>
        <div class="indicator"></div>
    </nav>
</div>

