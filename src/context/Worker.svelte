<script lang="ts">
	import { onMount, onDestroy, setContext  } from 'svelte';
	export let syncWorker: Worker | undefined = undefined;

	
	async function initializeWorker() {
		const WebWorker = await import('./HD.ts?worker');
		syncWorker = new WebWorker.default();
		syncWorker.postMessage({ msg: 'start' });
		
		// setContext("worker", () => {
		// 	getWorker: () => syncWorker
		// })
		syncWorker.addEventListener('message', (event) => {
			console.log(event.data);
		});
	}

	export function sendMessage(message: SendMessage) {
		syncWorker?.postMessage({

		})
	}
	
	onMount(initializeWorker);
	
	
	onDestroy(() => syncWorker?.postMessage({ message: 'stop' }));
</script>
