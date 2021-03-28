import { Server, Socket } from 'socket.io'
import debug from 'debug';
import http from 'http'

import emmiter from "./emmiter"
import debugLog from "./debug.singleton"

const log: debug.IDebugger = debugLog.extendNamspace('socket.io')

export default function initializeIO(httpServer: http.Server) {
  const _io = new Server(httpServer);

  log('===================== connected');
  _io.on('connection', (socket: Socket) => {
    log('client connected');
    emmiter.on('send to ui', (msg) => {
      socket.emit('ui', msg);
    });
  });

  return _io;
};
