/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const logHtml = function (cssClass: string, ...args: any[]) {
	postMessage({
		type: 'log',
		payload: { cssClass, args },
	});
};

const log = (...args: string[]) => logHtml('', ...args);
const error = (...args: any[]) => logHtml('error', ...args);
let db: any;

const directories = {
	async create(name: any, parentId: any) {
		const { lastID } = await db.run(`
			INSERT INTO directories(name, parent_id)
			VALUES(?, ?)
		`, name, parentId);
		return lastID;
	},

	async read(id: any) {
		const row = await db.get(`
			SELECT * FROM directories WHERE id = ?
		`, id);
		return row || null;
	},

	async update(id: any, name: any) {
		await db.run(`
			UPDATE directories SET name = ? WHERE id = ?
		`, name, id);
	},

	async delete(id: any) {
		await db.run(`
			DELETE FROM directories WHERE id = ?
		`, id);
	},
};

const files = {
	async create(name: any, parentId: number, content: any) {
		const { lastID } = await db.run(`
			INSERT INTO files(name, parent_id, content)
			VALUES(?, ?, ?)
		`, name, parentId, content);
		return lastID;
	},

	async read(id: any) {
		const row = await db.get(`
			SELECT * FROM files WHERE id = ?
		`, id);
		return row || null;
	},

	async update(id: any, name: any, content: any) {
		await db.run(`
			UPDATE files SET name = ?, content = ? WHERE id = ?
		`, name, content, id);
	},

	async delete(id: any) {
		await db.run(`
			DELETE FROM files WHERE id = ?
		`, id);
	},
};

const start = async function (sqlite3: any) {

	if ('opfs' in sqlite3) {
		db = new sqlite3.oo1.OpfsDb('/HD.sqlite3');
	} else {
		db = new sqlite3.oo1.DB('/HD.sqlite3', 'ct');
	}

	try {
		log('Creating tables...');
		await db.exec('CREATE TABLE IF NOT EXISTS directories (id INTEGER PRIMARY KEY, name TEXT, parent_id INTEGER)');
		await db.exec('CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY, name TEXT, parent_id INTEGER, content TEXT)');

		await db.exec({
			sql: 'INSERT INTO directories (name, parent_id) VALUES (?, ?)',
			bind: ['dir1', null]
		});
		await db.exec({
			sql: 'INSERT INTO directories (name, parent_id) VALUES (?, ?)',
			bind: ['dir2', 1],
		});
		await db.exec({
			sql: 'INSERT INTO directories (name, parent_id) VALUES (?, ?)',
			bind: ['dir3', 1],
		});
		await db.exec({
			sql: 'INSERT INTO directories (name, parent_id) VALUES (?, ?)',
			bind: ['dir4', 1],
		});
		await db.exec({
			sql: 'INSERT INTO files (name, parent_id, content) VALUES (?, ?, ?)',
			bind: ['file1.txt', 1, 'Conteúdo do arquivo 1'],
		});
	} finally {
		db.close();
	}
};

sqlite3InitModule({
	print: log,
	printErr: error,
}).then((sqlite3: any) => {
	try {
		start(sqlite3);
	} catch (err: any) {
		error(err.name, err.message);
	}
});

self.onmessage = function (event) {
	const message = event.data;

	switch (message.type) {
		//CRUD - Arquivos
		case 'CREATE_FILE':
			files.create(message.payload.fileName, 1, message.payload.content);
			break;
		case 'READ_FILE':
			files.read(1);
			break;
		case 'UPDATE_FILE':
			files.update(1, message.payload.fileName, message.payload.content);
			break;
		case 'DELETE_FILE':
			files.delete(1);
			break;

		//CRUD - Diretorios
		case 'CREATE_DIRECTORY':
			directories.create(message.payload.fileName, 1);
			break;
		case 'READ_DIRECTORY':
			directories.read(1);
			break;
		case 'UPDATE_DIRECTORY':
			directories.update(1, message.payload.fileName);
			break;
		case 'DELETE_DIRECTORY':
			directories.delete(1);
			break;
		default:
			console.log('Mensagem inválida:', message);
	}
};

