<script>
	import BggCollection from './BggCollection.svelte'
	import YourList from './YourList.svelte'
	import BggSearch from './BggSearch.svelte'
	// import YourListGrid from './List/YourListGrid.svelte'
	import TextEntry from './TextEntry.svelte'
	import list from '../../stores/list-store.js'
	import { category } from '../../stores/category'

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

	$: filteredList = $list.filter(l => l.addedToList).sort((a, b) => (a.order > b.order) ? 1 : -1)
	$: isVisible = filteredList.length > 0 ? true : false

	let categoryValue = $category.value;
	let categoryName = $category.name

</script>

<style>
	.list-step-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		margin: 0 auto;
		max-width: 1280px;
		flex: 1 0 auto;
		width: 100%;
	}

	.lists {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.lists > div {
		margin: 0 1rem;
		flex-grow: 1;
		width: 100%;
	}

	@media only screen and (max-width: 768px) {
		.lists {
			flex-direction: column;
			align-items: center;
		}

		.lists > div {
			width: 92%;
		}
	}


</style>

<section class="list-step-container">
	<main>
		<div class="lists">
			<div>
				{#if categoryValue === 2}
				<BggCollection list="{$list}" />
				<BggSearch list="{$list}" />
				{/if}
				<TextEntry />
			</div>
			<div>
				<YourList list="{$list}" />
			</div>
		</div>
	</main>
	<!-- <YourListGrid list={$list} on:downloaded={toggleModal} /> -->
</section>


