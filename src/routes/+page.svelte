<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    onMount(() => {
        if ($page.data.session) {
            goto("/search")
        }
    })
</script>

<div class="container">
    
    <h1>All Your Class Readings</h1>
    <h2>Fast, Automatic, and Free</h2>
    <button on:click={() => {signIn("google")}}>
        Sign In with Google
    </button>
</div>

<style>
   .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        background-color: var(--color-dark);
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 0;
        color: var(--color-primary);
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
        color: var(--color-secondary);
    }

    button {
        font-size: 1.5rem;
        margin-top: 1rem;
        
        background-color: var(--color-primary);
        color: var(--color-dark);

        border: none;
        border-radius: 10px;
        padding: 10px 20px;

        cursor: pointer;
        transition: 0.3s all;
    }

    button:hover {
        background-color: var(--color-secondary);
    }

    button:active {
        background-color: var(--color-secondary);
   } 
</style>