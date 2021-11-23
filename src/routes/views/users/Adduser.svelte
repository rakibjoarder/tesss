<script>
	import { fade, slide, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';
	import { createForm } from 'svelte-forms-lib';
	import Alert from '../components/Alert.svelte';
	let dispatch = createEventDispatcher();
	let message = '';
	var initialValues = {};
	// firestore reference
	let ref = collection(Firestoredb, 'users');
	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: initialValues,
		validate: (values) => {
			let errors = {};
			if (!values.name) {
				errors.name = 'Name is Required';
			}
			if (!values.email) {
				errors.email = 'Email is Required';
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
				errors.email = 'Invalid emaill address';
			}
			if (!values.age) {
				errors['age'] = 'Age is required';
			} else if (values.age < 0 || values.age > 120) {
				errors.age = 'Invalid age';
			}

			if (!values.gender) {
				errors['gender'] = 'Gender is required';
			}
			console.log(errors);
			// tailToast.de
			return errors;
		},
		onSubmit: async (values) => {
			// alert(JSON.stringify(values));
			const person = {
				name: values.name,
				age: values.age,
				gender: values.gender,
				email: values.email,
				id: Math.random()
			};

			// // add user  to store
			// await PersonStore.update((currentPerson) => {
			// 	return [person, ...currentPerson];
			// });
			// add user  to firebase
			addDoc(ref, person);
			message = 'Successfully Created User';
			await wait();
			message = '';
			$form.name = '';
			$form.email = '';
			$form.age = '';
			$form.gender = '';
		}
	});

	const wait = () => new Promise((res) => setTimeout(res, 2000));
</script>

<main class="flex justify-center items-center h-screen">
	<div
		class="  flex flex-col items-center bg-gray-100 p-14  rounded  shadow-xl justify-items-center md:w-3/5 "
		in:scale
	>
		<p class="text-gray-700  p-1 font-semibold text-xl border-b-2 mb-6 border-gray-600">Add User</p>
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex justify-center flex-col bg-gray-100 md:w-4/6 "
		>
			<input
				class="input"
				type="text"
				name="Name"
				bind:value={$form.name}
				placeholder="Name"
				on:change={handleChange}
			/>
			{#if $errors.name}
				<span class="error mb-2 -mt-2"> {$errors.name}</span>
			{/if}

			<input
				class="input"
				type="text"
				name="Name"
				bind:value={$form.email}
				placeholder="Email"
				on:change={handleChange}
			/>
			{#if $errors.email}
				<span class="error mb-2 -mt-2"> {$errors.email}</span>
			{/if}
			<input
				class="input"
				type="number"
				name="Age"
				bind:value={$form.age}
				placeholder="Age"
				on:change={handleChange}
			/>
			{#if $errors.age}
				<span class="error mb-2 -mt-2"> {$errors.age}</span>
			{/if}
			<select class="input" bind:value={$form.gender}>
				<option class="" value="">Select Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			{#if $errors.gender}
				<span class="error mb-2 -mt-2"> {$errors.gender}</span>
			{/if}
			<br />
			<div class="flex justify-around flex-row">
				<input class="btnClass flex-grow" type="submit" /><br />
				<a
					class="  hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full hover:shadow-md cursor-pointer bg-red-500 flex-grow ml-4 text-sm text-center"
					href="/views/users"
					>Back
				</a>
			</div>
		</form>
		{#if message.length > 0}
			<div class="mt-4" />
			<Alert type="success" {message} />
		{/if}
	</div>
</main>

<style>
	.btnClass {
		@apply bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded-full hover:shadow-md cursor-pointer text-sm;
	}

	.input {
		@apply border-0 px-3 py-3 mb-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150;
	}
	.error {
		@apply text-red-600 text-xs;
	}
</style>
