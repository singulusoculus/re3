<script>
	import { fly, fade } from 'svelte/transition'
	import NavDrawer from './NavDrawer.svelte'

	let drawerVisible = false

	const toggleDrawer = (drawer) => {
		if (drawer) {
			drawerVisible = drawer
		} else {
			drawerVisible = false
		}
	}
</script>

<style>
	.nav-wrapper {
		flex: 0 0 auto;
		width: 5rem;
	}

	nav {
		width: 5rem;
		height: 100vh;
		position: fixed;
		top: 0;
		background-color: var(--color-primary);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 4px 4px 5px 0 rgba(0,0,0,0.30);
		z-index: 405;
	}

	.logo {
		width: 9rem;
		margin-top: 15px;
		margin-left: 15px;
		background-color: #FFF;
		box-shadow: 4px 4px 5px 0 rgba(0,0,0,0.30);
		transition: all .4s ease-in-out;
		transition-delay: .1s;
	}

	/* .logo.active {
		transform: translateX(2rem);
	} */

	.site-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;;
		position: relative;
		flex: 1 0 auto;
	}

	.site-nav > div {
		margin-bottom: 3rem;
		position: relative;
		/* margin-left: 3rem; */
		padding: 7px 3px 3px 5px;;
		background: var(--color-primary);
		border-radius: 3px;
		/* box-shadow: 5px 0 5px -5px rgba(0,0,0,1); */
		transition: all .4s;
		transition-delay: .1s;
	}

	.site-nav > div:not(.active):hover {
		box-shadow: var(--shadow-dark);
		transform: translateY(-2px);
	}

	.site-nav > div:not(.active):active {
		box-shadow: var(--shadow-dark);
		transform: translateY(-1px);
	}

	.site-nav > div.active {
		background-color: #FFF;
		box-shadow: unset;
		transform: translateX(2rem);
	}

	.site-nav > div.active > .material-icons {
		color: #000;
	}

	.icon {
		cursor: pointer;
	}

	@media only screen and (max-width: 960px) {
		.nav-wrapper {
			width: unset;
			position: fixed;
			bottom: -1px;
			width: 100%;
			z-index: 500;
		}

		nav {
			flex-direction: row;
			width: 100%;
			height: 55px;
			position: relative;
			box-shadow: 4px -4px 5px 0 rgba(0,0,0,0.30);

		}

		.site-nav {
			flex-direction: row;
			align-content: center;
		}

		.site-nav > div {
			margin-bottom: 0;
			/* margin-bottom: 3rem; */
			margin-left: 7rem;
			/* box-shadow: 0 -5px 5px -5px rgba(0,0,0,1); */
		}

		.site-nav > div.active {
			transform: translateY(-2rem);
		}

		.logo {
			margin-left: 1rem;
			width: 7rem;
			margin-top: -3rem;
		}

		/* .logo.active {
			transform: translateY(-2rem);
		} */

		.site-nav > div:not(.active):active {
			box-shadow: unset;
			transform: unset;
		}
	}

	@media only screen and (max-width: 550px) {

		.site-nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0 10px;
		}

		.site-nav > div {
			margin-left: unset;
			/* margin-bottom: 3rem;
			box-shadow: 0px -5px 5px -5px rgba(0,0,0,1); */

		}

		.site-nav > div.active {
			transform: translateY(-3rem);
		}

		.logo {
			width: 7rem;
			margin-top: -2rem;
		}

		/* .logo.active {
			transform: translateY(-2rem);
		} */

		.material-icons {
			font-size: 30px;
		}

	}

</style>


<div class="nav-wrapper">
	<nav>
		<a href="." class="logo-wrapper">
			<img src="bgre-logo.png" alt="" class="logo" class:active={drawerVisible}>
		</a>

		<div class="site-nav">
			<div class="icon icon-menu" class:active={drawerVisible === 'menu'} on:click={drawerVisible === 'menu' ? () => {toggleDrawer()} : () => {toggleDrawer('menu')}}>
				<i class="material-icons md-36 md-light">menu</i>
			</div>
			<div class="icon icon-account" class:active={drawerVisible === 'account'} on:click={drawerVisible === 'account' ? () => {toggleDrawer()} : () => {toggleDrawer('account')}}>
				<i class="material-icons md-36 md-light">account_box</i>
			</div>
			<div class="icon icon-help" class:active={drawerVisible === 'help'} on:click={drawerVisible === 'help' ? () => {toggleDrawer()} : () => {toggleDrawer('help')}}>
				<i class="material-icons md-36 md-light">help_center</i>
			</div>
		</div>

	</nav>
</div>

<NavDrawer drawerVisible={drawerVisible} on:overlayClicked={() => {toggleDrawer()}} />

