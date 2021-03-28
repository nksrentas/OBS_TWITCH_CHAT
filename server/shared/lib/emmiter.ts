import Emmiter from 'events'
import chalk from 'chalk'
import debug from 'debug';

import debugLog from './debug.singleton'
import Message from '../models/message.interface'

const log: debug.IDebugger = debugLog.extendNamspace('emmiter')

const e = new Emmiter();

function printCommand({ username, context, message }: Message) {

  const { color, mod, subscriber, turbo, badges } = context;
  const modMsg = mod ? 'mod:= YES' : '';
  const subMsg = subscriber ? 'sub:= YES' : '';
  const turboMsg = turbo ? 'turbo:= YES' : '';

  if (color) {
    log(
      `${chalk.hex(color)(
        username
      )} ==>  ${message} {${modMsg} ${subMsg} ${turboMsg} badges:= ${JSON.stringify(
        badges
      )}}`
    );
  } else {
    log(`${chalk.black.bgRedBright(username)} ==>  ${message}`);
  }

  e.emit('send to ui', `${username} ==>  ${message}`);
}

e.on('command', printCommand);

export default e
