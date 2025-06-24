<script lang="ts">
    import { user } from "$lib/auth/user";

    const logout = async () => {
        await user.logout()
    }
</script>

<button onclick={logout}>log out</button>