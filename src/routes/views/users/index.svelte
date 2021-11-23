<script>
	import { onDestroy, onMount } from 'svelte';
	// import PersonStore from "../../stores/personstore";
	import { fade, slide, scale } from 'svelte/transition';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
	import { is_empty } from 'svelte/internal';
	import TableDropdown from '../components/TableDropdown.svelte';

	let people = [];
	let ref = collection(Firestoredb, 'users');
	people = [];

	onMount(() => {
		//getting user data from firebase
		console.log('onMount');
		var unsub = onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});
			console.log(results);
			people = results;
		});
		// get person from store.js
		// var unsub = PersonStore.subscribe((data) => {
		// 	people = data;
		// });
	});

	onDestroy(() => {
		console.log('onDestroy');
	});

	// delete person from firebase

	const onDelete = async (id) => {
		await deleteDoc(doc(Firestoredb, 'users', id));
	};
	// edit person from firebase
	const onEdit = async (id) => {
		await deleteDoc(doc(Firestoredb, 'users', id));
	};
</script>

<main class=" h-screen">
	<div
		class="relative flex flex-col min-w-0 break-words bg-gray-800 text-white w-full mb-6 shadow-lg rounded"
	>
		<div class="rounded-t mb-0 px-4 py-3 border-0">
			<div class="flex flex-wrap items-center">
				<div class="relative w-full px-4 max-w-full flex-grow flex-1">
					<h3 class="font-semibold text-base text-blueGray-700">User Table</h3>
				</div>
				<div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
					<button
						class="bg-yellow-600 text-white  active:bg-green-600 text-xs font-bold uppercase px-5 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						on:click={() => {
							location.href = 'users/Adduser';
						}}
					>
						Add User
					</button>
				</div>
			</div>
		</div>
		<div class="block w-full overflow-x-auto bg-gray-800 max-h-96">
			<!-- Projects table -->
			<table class="items-center w-full bg-transparent border-collapse max-h-96 overflow-auto">
				<thead class="bg-gray-900 text-white">
					<tr>
						<th
							class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
						>
							Name
						</th>
						<th
							class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
						>
							Email
						</th>
						<th
							class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
						>
							Gender
						</th>
						<th
							class="px-6 bg-blueGray-50 text-blueGray-500  border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold "
						/>
					</tr>
				</thead>
				{#if people.length > 0}
					{#each people as person}
						<tbody>
							<tr>
								<td
									class=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center"
								>
									{person.name}
								</td>
								<td
									class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center"
								>
									{person.email}
								</td>
								<td
									class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-2 text-center"
								>
									{person.gender === 'Male' ? '👨' : '👧'}
								</td>
								<td
									class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left"
								>
									<TableDropdown
										item={person}
										on:onDelete={onDelete(person.id)}
										on:onEdit={onEdit(person.id)}
									/>
								</td>
							</tr>
						</tbody>
					{/each}
				{/if}
			</table>
			{#if people.length == 0} <div class="emptyTable text-center p-4">No Users Available</div>{/if}
		</div>
	</div>
</main>

<style>
</style>
