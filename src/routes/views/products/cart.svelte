<script>
	import { each } from 'svelte/internal';
	import Cartstore from '../../../config/cartstore';
	import { browser } from '$app/env';

	let cartItems = [];
	let count = 0;

	$: totalAmount = parseInt((browser && localStorage.getItem('totalAmount')) ?? 0);
	const onIncrement = async (item) => {
		Cartstore.update((currentItems) => {
			let copiedItems = [...currentItems];
			let selectedItem = copiedItems.find((poll) => poll.id === item.id);
			if (item.id === selectedItem.id) {
				selectedItem.count += 1;

				totalAmount += selectedItem.price;
			}
			localStorage.setItem('totalAmount', totalAmount ?? 0);
			localStorage.setItem('cartItems', JSON.stringify(copiedItems));

			return copiedItems;
		});
	};

	const onDecrement = async (item) => {
		Cartstore.update((currentItems) => {
			let copiedItems = [...currentItems];
			let selectedItem = copiedItems.find((product) => product.id === product.id);
			if (item.id === selectedItem.id) {
				if (selectedItem.count > 1) {
					selectedItem.count -= 1;
					totalAmount -= selectedItem.price;
				} else {
					totalAmount -= selectedItem.price;
					copiedItems = copiedItems.filter((product) => product.id != item.id);
				}
			}
			localStorage.setItem('totalAmount', totalAmount);
			localStorage.setItem('cartItems', JSON.stringify(copiedItems));
			return copiedItems;
		});
	};
</script>

<div class="overflow-auto text-gray-900 text-center flex flex-col ">
	{#if $Cartstore.length > 0}
		<a
			class="text-yellow-600  text-lg  p-1 font-semibold  hover:text-gray-700 cursor-pointer text-left"
			href="/views/products"
		>
			<div class="flex justify-end">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mr-1 "
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>Continue Shopping
			</div>
		</a>
	{/if}
	<div class=" lg:grid lg:grid-cols-4 lg:h-screen">
		{#if $Cartstore.length > 0}
			<div class="lg:col-span-3 bg-white p-3">
				<div class="flex justify-between p-4 border-b-2 border-gray-200">
					<div class="text-gray-800 text-lg font-bold">Shopping Cart</div>
					<div class="text-gray-800 text-lg font-bold">{$Cartstore.length} items</div>
				</div>
				<div class="grid grid-cols-6 p-4 ">
					<div class=" text-sm text-gray-900 font-bold text-left col-span-4">Product Details</div>
					<div class="text-sm  text-gray-900  font-bold  text-center col-span-1 ">Price</div>
					<div class=" text-sm text-gray-900 font-bold   text-right col-span-1 ">Action</div>
				</div>

				{#each $Cartstore as item}
					<div class="grid grid-cols-6 p-4 lg:divide-x-2 lg:divide-gray-300 ">
						<div class=" text-sm text-gray-700 font-semibold text-left col-span-4">
							{item.name}
							- {item.quantity + item.unit_name}
						</div>

						<div class=" text-sm  text-gray-700 font-semibold  text-center col-span-1 ">
							{item.price}
						</div>
						<!-- <div class=" text-sm  hover: text-right col-span-1 "> -->
						<!-- <button
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-yellow-600 hover:text-red-600 hover:scale-110 shadow-xl"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg></button
						> -->
						<div class="flex  justify-end col-span-1">
							<button class="cursor-pointer" on:click={() => onDecrement(item)}>
								<svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"
									><path
										d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
									/>
								</svg></button
							>

							<input class="mx-2 border text-center w-8" type="text" value={item.count} disabled />

							<button class="cursor-pointer" on:click={() => onIncrement(item)}>
								<svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
									<path
										d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
									/>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="lg:col-span-1 bg-gray-800 pt-5 p-4">
				<div>
					<div class="pt-4 pb-4 border-b border-gray-100 text-left">
						<div class="text-white text-sm font-bold">Order Summary</div>
					</div>
					<div class="flex justify-between mt-2  border-gray-200 mb-2">
						<div class="text-white text-xs font-semibold">Items {$Cartstore.length}</div>
						<div class="text-white text-xs font-semibold">
							${totalAmount}
						</div>
					</div>

					<div class="flex justify-between mt-3  border-gray-200 ">
						<div class="text-white text-xs font-semibold">Delivery Charge</div>
						<div class="text-white text-xs font-semibold">$40</div>
					</div>
					<div class="flex justify-between mt-4  border-gray-100 border-b" />
					<div class="flex justify-between mt-1">
						<div class="text-white text-sm font-semibold">Total</div>
						<div class="text-white text-sm font-semibold">${totalAmount + 40}</div>
					</div>

					<button
						class="bg-yellow-600 w-3/5 md:w-2/5 lg:w-full text-white mt-6 text-sm font-semibold p-1 rounded shadow-xl ho:bg-green-900 cursor-pointer"
						on:click={() => {
							let products = [];
							for (var i = 0; i < $Cartstore.length; i++) {
								products.push({
									id: $Cartstore[i].id,
									name: $Cartstore[i].name,
									count: $Cartstore[i].count,
									price: $Cartstore[i].price,
									image: $Cartstore[i].image,
									unit_name: $Cartstore[i].unit_name,
									quantity: $Cartstore[i].quantity
								});
							}
							console.log({
								products: products,
								total: totalAmount,
								delivery_charge: 40,
								order_status: 'pending'
							});
						}}>CHECK OUT</button
					>
				</div>
			</div>
		{:else}
			<div class="m-auto col-span-5 h-screen lg:h-auto">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-28 w-28 m-auto"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<div class="text-3xl font-extrabold mt-4">
					<span
						class="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-900 animate-pulse"
					>
						Your Cart is Empty
					</span>
				</div>
				<div class="font-bold text-lg p-4">Add something to make me happy :)</div>
				<button
					class="bg-yellow-600 px-14 text-white mt-6 text-sm font-semibold p-1 rounded shadow-xl hover:bg-green-900 cursor-pointer"
					on:click={() => (location.href = '/views/products')}
					>Continue Shopping
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
