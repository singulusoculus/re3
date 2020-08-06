<script lang="ts">
  import Nav from './components/UI/Nav.svelte'
  import StepNav from './components/UI/StepNav.svelte'
  import step from './components/stores/currentStep.js'
  import StepStart from './components/Start/StepStart.svelte'
  import StepList from './components/List/StepList.svelte'
  import StepRank from './components/Rank/StepRank.svelte'
  import StepResult from './components/Result/StepResult.svelte'

</script>

<div class="page-wrapper">
  <Nav />

	<main>
    <StepNav />

    <div class="section-wrapper">
      {#if $step === 'start'}
        <StepStart />
      {:else if $step === 'list'}
        <StepList />
      {:else if $step === 'rank'}
        <StepRank />
      {:else if $step === 'result'}
        <StepResult />
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