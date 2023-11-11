<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    let messages: string[] = [];

    async function pull(reader: ReadableStreamDefaultReader<Uint8Array>) {
        const { done, value } = await reader.read();

        if (done) {
            return;
        }

        const newMessage = new TextDecoder().decode(value).toString();
        messages = [...messages, newMessage];

        pull(reader);
    }

    async function subscribe() {
        const response = await fetch("/api/chatroom");
        const stream = response.body;

        if (stream) {
            const reader = stream.getReader();
            pull(reader);
        }
    }

    onMount(() => {
        subscribe();
    });
</script>

<form method="POST" use:enhance on:submit|preventDefault>
    <label>
        <!-- svelte-ignore a11y-autofocus -->
        <input name="message" autofocus />
    </label>
    <button>send</button>
</form>
{#each messages as message}
    <p>{message}</p>
{/each}
