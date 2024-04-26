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
        Sign In with <b>Google</b>
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
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--color-dark);
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
        margin-bottom: 2rem;
        color: var(--color-mid);
    }

    button {
        font-size: 1.5rem;
        
        background-color: var(--color-border);
        color: var(--color-mid);
        z-index: 0;

        border: none;
        border-radius: 10px;
        padding: 10px 20px;

        cursor: pointer;
        transition: 0.3s all;
    }

    button:hover {
        background-color: var(--color-dark);
        color: var(--color-light);
    }

    button:active {
        scale: .95;
        box-shadow: 0 5px 20px var(--color-border);
   } 
</style>