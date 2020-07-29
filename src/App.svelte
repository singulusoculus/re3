<script lang="ts">
  import Nav from './components/UI/Nav.svelte'

</script>

<div class="page-wrapper">
  <Nav />

	<main>
		<p>Hello variables</p>
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
		margin: 1rem 1rem 1rem 7rem;
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