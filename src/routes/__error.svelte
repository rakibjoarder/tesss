<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `Error - ${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<body class="h-screen"
	><div class="flex items-center justify-center min-h-full top-7">
		<div class="flex flex-col items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-32 w-32 text-red-600"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
			<h1 class="text-red-600 text-xl font-bold">{title}</h1>
		</div>
	</div></body
>
