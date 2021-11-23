<script>
	const showMenuItem = () => {
		if (document.querySelector('#ul').classList.contains('navul')) {
			document.querySelector('#ul').classList.remove('navul');
		} else {
			document.querySelector('#ul').classList.add('navul');
		}
	};
	let navItem = 'User';

	function setNavValue(name) {
		navItem = name;
	}
</script>

<nav class="md:fixed">
	<div>
		<div class="flex justify-between items-center">
			<h1
				class="font-semibold uppercase p-4 pb-2 border-b md:border-gray-50 bg-gradient-to-tr from-yellow-800 to-yellow-200 text-transparent bg-clip-text"
			>
				Svelte
			</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 mr-4 cursor-pointer md:hidden text-white"
				id="menu"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				on:click={showMenuItem}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</div>
	</div>
	<ul class="navul" id="ul">
		<li class="text-gray-700 font-bold py-1">
			<a
				href="/views/users"
				class={navItem === 'User'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4 '}
				on:click={() => setNavValue('User')}
			>
				<span class="text-lg text-white mr-2">User</span>
				<span class="text-lg text-white ">👥</span>

				<!-- <svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 ml-2 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg> -->
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/products"
				class={navItem === 'Product'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Product')}
			>
				<span class="text-lg text-white mr-2">Product</span>
				<span class="text-lg text-white ">📦</span>
				<!-- <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					class="w-5 ml-2 text-white"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
						clip-rule="evenodd"
					/>
				</svg> -->
			</a>
		</li>
	</ul>
</nav>

<style>
	.navul {
		@apply text-sm mt-6  md:block items-center flex  justify-center hidden;
	}
</style>
