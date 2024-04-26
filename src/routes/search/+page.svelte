<script>
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    import { fade } from "svelte/transition"

    let fileInput;
    let uploadForm;

    onMount(() => {
        if (!$page.data.session) goto("/");
    });

    export let data;
    $: textbooks = data.textbooks ?? []

    export let form;
</script>

{#if $page.data.session}
    <div class="container">
        <div class="user">
            <h4>
                Signed in as <b>{$page.data.session.user.name}</b>
            </h4>
            <button on:click={() => signOut()} class="button">Sign Out</button>
        </div>
        <div class="textbooks">
            <form bind:this={uploadForm} enctype="multipart/form-data" method="POST">
                <input bind:this={fileInput} type="file" name="file" accept=".pdf" hidden
                    on:change={() => uploadForm.submit()}/>
                <button class="textbook upload" on:click={fileInput.click()} type="button">
                    Upload a Syllabus 📝
                </button>
            </form>
            {#each textbooks as textbook}
            <a class="textbook" href="{textbook.downloadLink}">
                <h1>{textbook.title}</h1>
                <div class="stat">
                    <h3>Author(s)<h3>
                    <h2>{textbook.author}</h2>
                </div>
            </a>
            {/each}
        </div>
        {#if form?.success}
        <div transition:fade class="notif success">
            <span>Textbook Found! 🪄</span>
        </div>
        {:else if form?.error}
        <div class="notif fail">
            <span>Unable to find Textbook... 🔮</span>
        </div>
        {/if}
    </div>
{:else}
    <div transition:fade class="signedout">
        <span>Woops, you're not signed in!</span>
        <button on:click={() => goto("/")} class="button">Sign in</button>
    </div>
{/if}

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: var(--color-light);
    }
    form {
        width: 100%;
        margin-bottom: 1rem;
    }
    .textbooks {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: var(--color-light);
        color: var(--color-dark);
    }
    .textbook {
        width: 80%;
        height: 20%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        margin: 1rem 0 0 0;
        padding: 0.5rem 2rem 0.5rem 1rem;

        background-color: var(--color-light);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);
        box-shadow: 5px 5px 20px var(--color-border);

        cursor: pointer;
        transition: 0.3s all;
    }
    .textbook:hover {
        background-color: var(--color-border);
    }
    .textbook:active {
        scale: 0.95;
        background-color: var(--color-dark);
        color: var(--color-light);
    }

    a.textbook {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 0;
    }
    a.textbook h1 {
        width: 50%; 
        font-size: 1.5rem;
        font-weight: 600;
    }
    a.textbook h3 {
        font-size: 1rem;
        font-weight: 600;
    }
    a.textbook h2 {
        font-size: 1.2rem;
        font-weight: 400;
    }

    .stat {
        width: 20%;
        display: flex;
        flex-direction: column;
    }
    .stat h3 {
        color: var(--color-mid);
        transition: 0.3s all;
    }
    .stat h2 {
        color: var(--color-dark);
        transition: 0.3s all;
    }
    a.textbook:active .stat h2 {
        color: var(--color-light);
    }
    a.textbook:active .stat h3 {
        color: var(--color-light);
    }

    form {
        width: 80%;
        height: 20%;
    }

    button.textbook {
        width: 100%;
        height: 100%;
        border: none;

        justify-content: center;
        background-color: var(--color-border);
        color: var(--color-mid); 
    }
    button.textbook:hover {
        background-color: var(--color-success);
        color: var(--color-light);
    }

    .upload {
        font-family: "Inter", sans-serif;
        font-size: 2rem;
        font-weight: 600;
    }

    .user {
        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        
        padding: 1rem 10%;
        background-image: linear-gradient(180deg, var(--color-light), transparent);

        font-size: 1.2rem;
        color: var(--color-mid);

        height: 5%;
    }
    .user h4 {
        margin: 0 1em 0 0;
    }
    .user button {
        font-weight: 400;
        border: none;
        background-color: var(--color-light);
        border: 2px solid var(--color-border);
        color: var(--color-mid);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s all;
    }
    .user button:hover {
        background-color: var(--color-danger);
        color: var(--color-light);
    }
    .user button:active {
        scale: 0.95;
    }

    .notif {
        position: absolute;
        bottom: 3vh;
        right: 3vw;
        font-size: 1.2rem;
        padding: 1rem 2rem;
        border-radius: 15px;
        color: var(--color-light);
        animation: fade 0.3s 2s forwards;
    }
    .notif.success {
        background-color: var(--color-success);
    }
    .notif.fail {
        background-color: var(--color-danger);
    }

    @keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

</style>