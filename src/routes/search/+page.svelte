<script>
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    let fileInput;
    let uploadForm;

    onMount(() => {
        if (!$page.data.session) goto("/");
    });

    /* TODO, Fetch from backend */
    let textbooks = [
        {
            name: "Textbook Name",
            course: "Course",
            download: "Download"
        },
        {
            name: "Textbook Name",
            course: "Course",
            download: "Download"
        },
        {
            name: "Textbook Name",
            course: "Course",
            download: "Download"
        }
    ]

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
        <form bind:this={uploadForm} action="?/upload" enctype="multipart/form-data" method="POST">
            <input bind:this={fileInput} type="file" name="file" accept=".pdf" hidden
                on:change={() => uploadForm.submit()}/>
            <button class="upload" on:click={fileInput.click()} type="button">
                Upload a Syllabus 📝
            </button>
        </form>
        <ul class="textbooks">
            {#each textbooks as textbook}
            <li>
                <span>{textbook.name}</span>
                <span>{textbook.course}</span>
                <button>Download</button>
            </li>
            {/each}
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
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        background-color: var(--color-light);
    }
    form {
        margin-top: 10vh;
    }
    .upload {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 3rem;
        font-weight: bold;
        text-decoration: none;
        background-color: var(--color-accent);
        color: var(--color-light);

        border: 4px solid transparent;
        border-radius: 10px;
        padding: 10px 20px;

        cursor: pointer;
        transition: 0.3s all;
    }
    .upload:hover {
        background-color: var(--color-light);
        color: var(--color-accent);
        border: 4px solid var(--color-accent);
    }
    .upload:active {
        scale: 0.95;
        box-shadow: 0 0 20px 0 var(--color-accent); 
    }

    .user {
        position: absolute;
        top: 3vh;
        right: 3vw;
        font-size: 1.2rem;
    }
    .user button {
        float: right;
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

    ul {
        list-style: none;
        background-color: var(--color-light);
        padding: 0;
        margin-top: 2rem;
        width: 80vw;
        border-radius: 10px;
        font-size: 1.2rem;
    }
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 1rem 2rem;
        border-radius: 10px;
        background-color: var(--color-light);
        color: var(--color-secondary);
        border: 2px solid var(--color-secondary);
        transition: 0.3s all;
    }
    li:hover > button {
        scale: 1.1;
    }
    li button {
        font-size: 1rem;
        background-color: var(--color-accent);
        color: var(--color-light);
        z-index: 0;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        transition: 0.3s all;
        border: 2px solid transparent;
    }
    li button:hover {
        scale: 1.1;
        background-color: var(--color-light);
        color: var(--color-accent);
        border: 2px solid var(--color-accent);
    }
    li button:active {
        scale: 1;
        box-shadow: 0 0 20px 0 var(--color-accent);
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