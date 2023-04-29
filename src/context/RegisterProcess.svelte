<script lang="ts">
	import Chrome from '../components/TasksContents/Chrome.svelte';
	import Explorer from '../components/TasksContents/Explorer.svelte';
	import Teste from '../components/TasksContents/Teste.svelte';
	import type { Process } from './CPU';

	export let task: Process;
</script>

<main>
	{#if task.id === 'chrome'}
		<Chrome />
	{:else if task.id === 'file-explorer'}
		<Explorer />
	{:else if task.id === 'teste'}
		<Teste />
	{/if}
</main>
