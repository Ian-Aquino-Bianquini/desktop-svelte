import { writable } from 'svelte/store';

export interface Process {
	id: string;
	name: string;
	icon: string;
}

export const actives = writable<Process[]>([]);
export const minimizeds = writable<Process[]>([]);

export const allTasks = writable<Process[]>([
	{ icon: '', id: 'chrome', name: 'Chrome' },
	{ icon: '', id: 'file-explorer', name: 'Explorer' },
	{ icon: '', id: 'teste', name: 'Teste' }
]);

export function createProcess(process: Process) {
	actives.update((old) => [...old, process]);
}

export function minimizeProcess(id: string) {
	actives.update((oldActives) => {
		const process = oldActives.find((p) => p.id === id);
		if (process) {
			const index = oldActives.indexOf(process);
			const minimized = oldActives.splice(index, 1)[0];
			minimizeds.update((oldMinimizeds) => [...oldMinimizeds, minimized]);
		}
		return oldActives;
	});
}

export function activateProcess(id: string) {
	minimizeds.update((oldMinimizeds) => {
		const process = oldMinimizeds.find((p) => p.id === id);
		if (process) {
			const index = oldMinimizeds.indexOf(process);
			const active = oldMinimizeds.splice(index, 1)[0];
			actives.update((oldActives) => [...oldActives, active]);
		}
		return oldMinimizeds;
	});
}

export function deleteProcess(id: string) {
	actives.update((oldActives) => {
		const process = oldActives.find((p) => p.id === id);
		if (process) {
			const index = oldActives.indexOf(process);
			oldActives.splice(index, 1);
		}
		return oldActives;
	});
	minimizeds.update((oldMinimizeds) => {
		const process = oldMinimizeds.find((p) => p.id === id);
		if (process) {
			const index = oldMinimizeds.indexOf(process);
			oldMinimizeds.splice(index, 1);
		}
		return oldMinimizeds;
	});
}
