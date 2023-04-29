<script lang="ts">
	import { allTasks, type Process } from "../../context/CPU";
	import Button from "./Button.svelte";

  let allTasksAvailable: Process[];
   allTasks.subscribe((data) => allTasksAvailable = data);
</script>

<footer>
  {#each allTasksAvailable as task}
    <Button id={task.id} name={task.name} icon={task.icon} />
  {/each}
</footer>