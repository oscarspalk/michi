import { writable } from 'svelte/store';
import { ID, OAuthProvider } from 'appwrite';
import { goto } from '$app/navigation';
import { account } from '$lib/appwrite';

// Avoid auth calls in server-side, so that a user is not shared between requests
const isBrowser = typeof window !== 'undefined';

const createUser = () => {
	const store = writable<any>(null);

	async function init() {
		if (!isBrowser) return;
		try {
			store.set(await account.getSession('current'));
		} catch (e) {
			store.set(null);
		}
	}

	init();

	async function login() {
		if (!isBrowser) return;
		await account.createOAuth2Session(
            OAuthProvider.Github,
            'http://localhost:5173/', 'http://localhost:5173/', ['user']
        )
		await init();
		goto('/'); // Redirect to home page after login
	}

	async function logout() {
		await account.deleteSession('current');
		store.set(null);
	}

	return {
		// Exposes the store's value with $user
		subscribe: store.subscribe,
		login,
		logout,
		init
	};
};

export const user = createUser();
