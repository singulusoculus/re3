<script lang="ts">
  import Nav from './components/UI/Nav.svelte'
  import StepNav from './components/UI/StepNav.svelte'
  import { step } from './components/stores/step.js'
  import StepStart from './components/UI/StepStart.svelte'
  import StepList from './components/UI/StepList.svelte'
  import StepRank from './components/UI/StepRank.svelte'
  import StepResult from './components/UI/StepResult.svelte'


	const handleStepClick = (value) => {
		step.set(value.detail)
	}

</script>

<div class="page-wrapper">
  <Nav />

	<main>
		<StepNav currentStep={$step} on:stepClick={handleStepClick} />

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
	}

	main {
		flex: 1 1 auto;
		position: relative;
		box-sizing: border-box;
		margin: 2rem 1rem 1rem 9rem;
  }
  
  .section-wrapper {
    margin-top: 2rem;
  }

	@media only screen and (max-width: 960px) {
		.page-wrapper {
			flex-direction: column;
		}

		main {
			margin: 5rem 1rem 1rem 1rem;
    }
	}


</style>