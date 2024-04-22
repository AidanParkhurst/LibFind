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
            name: "Textbook",
            course: "Course",
            download: "Download"
        },
        {
            name: "Textbook",
            course: "Course",
            download: "Download"
        },
        {
            name: "Textbook",
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
                <div class="stat">
                    <h4>Name</h4>
                    <h3>{textbook.name}</h3>
                </div>

                <div class="stat">
                    <h4>Course</h4>
                    <h3>{textbook.course}</h3>
                </div>

                <button>
                    Download 📚
                </button>
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
        scale: 1.1;
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
        border-radius: 7px;
        padding: 5px 10px;

        cursor: pointer;
        transition: 0.3s all;
        border: 2px solid transparent;
    }
    .user button:hover {
        scale: 1.1;
        background-color: var(--color-light);
        color: var(--color-accent);
        border: 2px solid var(--color-accent);
    }
    .user button:active {
        scale: 1;
        box-shadow: 0 0 20px 0 var(--color-accent);
    }

    ul {
        list-style: none;
        background-color: var(--color-light);
        padding: 0;
        margin-top: 2rem;
        width: 80vw;
        border-radius: 10px;
        font-size: 2rem;
    }
    li {
        display: flex;
        justify-content: space-between;
        color: var(--color-secondary);

        margin-bottom: 1rem;
        padding: 1rem 2rem;

        border-radius: 10px;
        background-color: var(--color-light);
        border: 2px solid var(--color-secondary);

        transition: 0.3s all;
    }
    li:hover > button {
        scale: 1.1;
    }

    .stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .stat h4 {
        margin-top: 1rem;
        margin-bottom: .5rem;

        font-size: 1rem;
        color: var(--color-accent);
    }
    .stat h3 {
        margin: 0;
        margin-bottom: 1rem;

        font-size: 1.5rem;
        color: var(--color-secondary);
    }

    li button {
        font-size: 1.5rem;
        padding: 5px 10px;
        margin: 1rem 0;
        background-color: var(--color-accent);
        color: var(--color-light);

        border: none;
        border-radius: 10px;

        cursor: pointer;
        transition: 0.3s all;
        border: 3px solid transparent;
    }
    li button:hover {
        scale: 1.1;
        background-color: var(--color-light);
        color: var(--color-accent);
        border: 3px solid var(--color-accent);
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