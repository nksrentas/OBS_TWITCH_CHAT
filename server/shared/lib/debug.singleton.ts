import debug from 'debug'

class DebugSingleton {
  private static instance: DebugSingleton

  public log: debug.IDebugger

  constructor(name: string = 'app') {
    this.log = debug(name)
  }

  public static getInstance(): DebugSingleton {
    if (!DebugSingleton.instance) {
      DebugSingleton.instance = new DebugSingleton()
    }

    return DebugSingleton.instance
  }

  public extendNamspace(name: string): debug.IDebugger {
    if (name === '') {
      throw new Error('Debug namespace is empty or undefined')
    }

    return this.log.extend(name)
  }

}

export default DebugSingleton.getInstance()