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
    <span>
        <small>Signed in as</small><br/>
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button on:click={() => signOut()} class="button">Sign out</button>
{:else}
    <span>You are not signed in</span>
{/if}
