<script lang="ts">
  import { deleteProcess, minimizeProcess, type Process } from "../../context/CPU";
	import RegisterProcess from "../../context/RegisterProcess.svelte";

  export let task: Process;
  let maximized: boolean = false;

</script>

<div class:maximized="{maximized}">
  <header> 
    <button on:click={() => minimizeProcess(task.id)}>-</button>
    <button on:click={() => maximized = !maximized}>[]</button>
    <button on:click={() => deleteProcess(task.id)}>X</button>
  </header> 
  <main>
    <RegisterProcess task={task} />
  </main>
</div>