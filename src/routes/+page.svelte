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
    <h1>Upload a Syllabus, Get the Textbooks</h1>
    <h2>Fast, AI powered, and Free</h2>
    <button on:click={() => {signIn("google")}}>
        First, Sign In with Google
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
        background-color: var(--color-light);
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 0;
        color: var(--color-accent);
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
        color: var(--color-secondary);
    }

    button {
        font-size: 1.5rem;
        margin-top: 1rem;
        
        background-color: var(--color-accent);
        color: var(--color-light);
        z-index: 0;

        border: none;
        border-radius: 10px;
        padding: 10px 20px;

        cursor: pointer;
        transition: 0.3s all;
        border: 3px solid transparent;
    }

    button:hover {
        background: var(--color-light);
        color: var(--color-accent);
        border: 3px solid var(--color-accent);
    }

    button:active {
        border: 3px solid var(--color-accent);
        transform: scale(0.95);
        box-shadow: 0 5px 20px var(--color-accent);
   } 
</style>