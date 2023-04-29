interface SendMessage {
  type: 'CREATE_FILE' | 'READ_FILE' | 'UPDATE_FILE' | 'DELETE_FILE' | 'CREATE_DIRECTORY' | 'READ_DIRECTORY' | 'UPDATE_DIRECTORY' | 'DELETE_DIRECTORY',
  payload: {
    [key: string]: unknown
  }
}

declare function postMessage(message: SendMessage, targetOrigin: string, transfer?: Transferable[] | undefined): void

