<script>
    import { user } from '$lib/auth/user';
    import AuthPage from '../components/auth/auth_page.svelte';
    import LogoutButton from '../components/auth/logout_button.svelte';

	let { children } = $props();
    let userState = $state({
        loggedIn: false
    })

    user.subscribe((usr) => {
        let currentUsr = usr != null
        userState.loggedIn = currentUsr
    })
</script>


{#if userState.loggedIn}
<LogoutButton />
    {@render children()}    
{:else}
<AuthPage />
{/if}

