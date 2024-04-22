<script>
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    onMount(() => {
        if (!$page.data.session) {
            goto("/")
        }
    });

</script>

{#if $page.data.session}
    <div class="container">
        <div class="user">
            <span>
                <small>Signed in as</small>
                <strong>{$page.data.session.user?.name ?? "User"}</strong>
            </span><br>
            <button on:click={() => signOut()} class="button">Sign Out</button>
        </div>
        <button class="upload">
            Upload a Syllabus 📝
        </button>
        <h2>Get your Books 📚</h2>
        <ul class="textbooks">
            <!-- TODO: Foreach Response from Backend -->
            <li>
                <span>Textbook Name</span>
                <span>Course</span>
                <button>View</button>
            </li>
            <li>
                <span>Textbook Name</span>
                <span>Course</span>
                <button>View</button>
            </li>
            <li>
                <span>Textbook Name</span>
                <span>Course</span>
                <button>View</button>
            </li>
        </ul>
    </div>
{:else}
    <div class="signedout">
        <span>Woops, you're not signed in!</span>
        <button on:click={() => goto("/")} class="button">Sign in</button>
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        text-align: left;
        background-color: var(--color-light);
    }
    button.upload {
        margin-top: 10vh;
        font-size: 3rem;
        font-weight: bold;
        background: none;
        color: var(--color-accent);
        z-index: 0;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        cursor: pointer;
        transition: 0.3s all;
    }
    button.upload:hover {
        background-color: var(--color-accent);
        color: var(--color-light);
        scale: 1.1;
    }
    button.upload:active {
        scale: 1;
        box-shadow: 0 0 20px 0 var(--color-accent); 
    }
    h2 {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 3rem;
        font-weight: bold;
        margin-top: 2rem;
        color: var(--color-secondary);
    }

    .user {
        position: absolute;
        top: 3vh;
        left: 3vw;
        font-size: 1.2rem;
    }
    .user button {
        font-size: 1rem;
        background-color: var(--color-accent);
        color: var(--color-light);
        z-index: 0;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        transition: 0.3s all;
    }
    .user button:hover {
        scale: 1.1;
    }

    .signedout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        background-color: var(--color-light);
    }
    .signedout span {
        font-size: 2rem;
        margin-top: 0;
        color: var(--color-secondary);
    }

</style>