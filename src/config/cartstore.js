import { writable } from "svelte/store";
import { browser } from "$app/env";


const Cartstore = writable(JSON.parse(browser && localStorage.getItem('cartItems')) ?? []);


export default Cartstore;