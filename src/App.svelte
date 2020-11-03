<script lang="ts">
  import Nav from './components/UI/Nav.svelte'
  import StepNav from './components/UI/StepNav.svelte'
  import step from './stores/currentStep.js' 
  import StepStart from './components/Start/StepStart.svelte'
  import StepList from './components/List/StepList.svelte'
  import StepRank from './components/Rank/StepRank.svelte'
  import StepResult from './components/Result/StepResult.svelte'
  import { fly, fade } from 'svelte/transition'

</script>

<div class="page-wrapper">
  <Nav />

	<main>
    <StepNav />

    <div class="section-wrapper" in:fade>
      {#if $step === 'start'}
        <div out:fade="{{ duration:400 }}" in:fly="{{ delay: 500, duration:600, y: 50, opacity: 0 }}">
          <StepStart />
        </div>
      {:else if $step === 'list'}
        <div out:fade="{{ duration:400 }}" in:fly="{{ delay: 500, duration:600, y: 50, opacity: 0 }}">
          <StepList />
        </div>
      {:else if $step === 'rank'}
        <div out:fade="{{ duration:400 }}" in:fly="{{ delay: 500, duration:600, y: 50, opacity: 0 }}">
          <StepRank />
        </div>
      {:else if $step === 'result'}
        <div out:fade="{{ duration:400 }}" in:fly="{{ delay: 500, duration:600, y: 50, opacity: 0 }}">
          <StepResult />
        </div>
      {/if}
    </div>
	</main>
</div>


<style>
	.page-wrapper {
		display: flex;
    justify-content: space-between;
    min-height: 100vh;
	}

	main {
		flex: 1 1 auto;
		position: relative;
		box-sizing: border-box;
		margin: 2rem 1rem 1rem 9rem;
  }
  
  .section-wrapper {
    margin-top: 2rem;
    margin-bottom: auto;
  }

	@media only screen and (max-width: 960px) {
		.page-wrapper {
			flex-direction: column;
		}

		main {
			margin: 5rem 1rem 1rem 1rem;
    }
	}

  @media only screen and (max-width: 960px) {
    .page-wrapper {
			flex-direction: column-reverse;
		} 
    
    main {
      margin: 1rem 1rem 3rem 1rem;
    }

  }


</style>