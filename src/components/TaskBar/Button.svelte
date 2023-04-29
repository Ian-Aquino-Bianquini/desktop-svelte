<script lang="ts">
	import { createProcess, actives, minimizeds, type Process, minimizeProcess, activateProcess } from '../../context/CPU';
	export let id: string;
	export let name: string;
	export let icon: string;

	let activesTasks: Process[];
	let minimizedTasks: Process[];

	actives.subscribe((data) => activesTasks = data);
	minimizeds.subscribe((data) => minimizedTasks = data);

	function handleClick() {
		if(activesTasks.find((element) => element.id === id)) {
			minimizeProcess(id);
			return;
		}

		if(minimizedTasks.find((element) => element.id === id)) {
			activateProcess(id);
			return;
		}

		createProcess({
			id,
			icon,
			name
		})
	}

</script>

<button
	on:click={handleClick}
>
	<img src={icon} alt={name}>
</button>
