import type * as Party from 'partykit/server'

type Cursor = {
  // replicating the default connection fields to avoid
  // having to do an extra deserializeAttachment
  id: string
  uri: string

  // country is set upon connection
  country: string | null

  // cursor fields are only set on first message
  x?: number
  y?: number
  pointer?: 'mouse' | 'touch'
  lastUpdate?: number
}

type UpdateMessage = {
  type: 'update'
  id: string // websocket.id
} & Cursor

type SyncMessage = {
  type: 'sync'
  cursors: { [id: string]: Cursor }
}

type RemoveMessage = {
  type: 'remove'
  id: string // websocket.id
}

type ConnectionWithCursor = Party.Connection & { cursor?: Cursor }

// server.ts
export default class CursorServer implements Party.Server {
  // eslint-disable-next-line no-useless-constructor
  constructor(public room: Party.Room) {}

  options: Party.ServerOptions = {
    hibernate: true,
  }

  onConnect(
    websocket: Party.Connection,
    { request }: Party.ConnectionContext
  ): void | Promise<void> {
    const country = request.cf?.country ?? null

    // Stash the country in the websocket attachment
    websocket.serializeAttachment({
      ...websocket.deserializeAttachment(),
      country: country,
    })

    console.log('[connect]', this.room.id, websocket.id, country)

    // On connect, send a "sync" message to the new connection
    // Pull the cursor from all websocket attachments
    let cursors: { [id: string]: Cursor } = {}
    for (const ws of this.room.getConnections()) {
      const id = ws.id
      let cursor =
        (ws as ConnectionWithCursor).cursor ?? ws.deserializeAttachment()
      if (
        id !== websocket.id &&
        cursor !== null &&
        cursor.x !== undefined &&
        cursor.y !== undefined
      ) {
        cursors[id] = cursor
      }
    }

    const msg = {
      type: 'sync',
      cursors: cursors,
    } as SyncMessage

    websocket.send(JSON.stringify(msg))
  }

  onMessage(
    message: string,
    websocket: Party.Connection
  ): void | Promise<void> {
    const position = JSON.parse(message as string)
    const prevCursor = this.getCursor(websocket)
    const cursor = {
      id: websocket.id,
      x: position.x,
      y: position.y,
      pointer: position.pointer,
      country: prevCursor?.country,
      lastUpdate: Date.now(),
    } as Cursor

    this.setCursor(websocket, cursor)

    const msg =
      position.x && position.y
        ? ({
            type: 'update',
            ...cursor,
            id: websocket.id,
          } as UpdateMessage)
        : ({
            type: 'remove',
            id: websocket.id,
          } as RemoveMessage)

    // Broadcast, excluding self
    this.room.broadcast(JSON.stringify(msg), [websocket.id])
  }

  getCursor(connection: ConnectionWithCursor) {
    if (!connection.cursor) {
      connection.cursor = connection.deserializeAttachment()
    }

    return connection.cursor
  }

  setCursor(connection: ConnectionWithCursor, cursor: Cursor) {
    let prevCursor = connection.cursor
    connection.cursor = cursor

    // throttle writing to attachment to once every 100ms
    if (
      !prevCursor ||
      !prevCursor.lastUpdate ||
      (cursor.lastUpdate && cursor.lastUpdate - prevCursor.lastUpdate > 100)
    ) {
      // Stash the cursor in the websocket attachment
      connection.serializeAttachment({
        ...cursor,
      })
    }
  }

  onClose(websocket: Party.Connection) {
    // Broadcast a "remove" message to all connections
    const msg = {
      type: 'remove',
      id: websocket.id,
    } as RemoveMessage

    console.log(
      '[disconnect]',
      this.room.id,
      websocket.id,
      websocket.readyState
    )

    this.room.broadcast(JSON.stringify(msg), [])
  }
}

CursorServer satisfies Party.Worker
