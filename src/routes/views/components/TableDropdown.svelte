<script>
	// library for creating dropdown menu appear on click
	import { createPopper } from "@popperjs/core";
	// core components
	import { createEventDispatcher } from "svelte";
	let dropdownPopoverShow = false;
	let btnDropdownRef;
	let popoverDropdownRef;
	export let item;

	let dispatch = createEventDispatcher();

	const toggleDropdown = (event) => {
		event.preventDefault();
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: "bottom-start",
			});
		}
	};

	const editItem = (e) => {
		e.preventDefault();
		dropdownPopoverShow = false;

		dispatch("onEdit", item);
	};

	const deleteItem = (e) => {
		e.preventDefault();
		dropdownPopoverShow = false;

		dispatch("onDelete", item);
	};
</script>

<div>
	<a
		class="text-blueGray-500 float-right"
		href="#pablo"
		bind:this={btnDropdownRef}
		on:click={toggleDropdown}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 items-center text-center"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
			/>
		</svg>
	</a>
	<div
		bind:this={popoverDropdownRef}
		class="bg-yellow-600 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
			? 'block'
			: 'hidden'}"
	>
		<a
			href="#pablo"
			on:click={editItem}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
		>
			Delete
		</a>
		<a
			href="#pablo"
			on:click={editItem}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
		>
			Edit
		</a>
	</div>
</div>
