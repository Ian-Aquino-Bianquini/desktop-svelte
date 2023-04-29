<script lang="ts">
	import { getContext, } from 'svelte';
	import TaskBar from '../components/TaskBar/TaskBar.svelte';
	import Window from '../components/common/Window.svelte';
	import { actives, type Process } from '../context/CPU';
	import WorkerComponent from '../context/Worker.svelte';

	import './styles.scss';

	// const { getWorker } = getContext("worker") as {getWorker: () => void};

	// $: console.log(getWorker)

	let windowDirectoriesAndFiles = [] as {}[]

	let activeTasks: Process[];
	actives.subscribe((task) => (activeTasks = task));


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<WorkerComponent />

<div style="flex:1;">
	{#each windowDirectoriesAndFiles as actual}
		<button>{actual}</button>
	{/each}
	{#each activeTasks as process}
		<Window task={process} />
	{/each}
</div>

<section class="taskbar">
	<TaskBar />
</section>
