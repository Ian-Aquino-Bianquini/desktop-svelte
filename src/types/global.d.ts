/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@sqlite.org/sqlite-wasm' {
  const sqlite3InitModule: any;
  export default sqlite3InitModule;
}