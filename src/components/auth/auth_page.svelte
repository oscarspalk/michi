<script lang="ts">
    import { user } from "$lib/auth/user";

    const login = async () =>{
        await user.login()
    }
</script>

<h2>Press the button to authenticate with github</h2>
<button onclick={login}>
    login
</button>