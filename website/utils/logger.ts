
interface Logger {
  log: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
  debug: (...args: any[]) => void
  group: (label: string) => void
  groupEnd: () => void
  time: (label: string) => void
  timeEnd: (label: string) => void
}

const isDev = process.env.NODE_ENV === 'development'

export const logger: Logger = {
  log: (...args: any[]) => {
    if (isDev) console.log('[LOG]', ...args)
  },

  info: (...args: any[]) => {
    if (isDev) console.info('[INFO]', ...args)
  },

  warn: (...args: any[]) => {
    if (isDev) console.warn('[WARN]', ...args)
  },

  error: (...args: any[]) => {

    console.error('[ERROR]', ...args)
  },

  debug: (...args: any[]) => {
    if (isDev) console.debug('[DEBUG]', ...args)
  },

  group: (label: string) => {
    if (isDev) console.group(label)
  },

  groupEnd: () => {
    if (isDev) console.groupEnd()
  },

  time: (label: string) => {
    if (isDev) console.time(label)
  },

  timeEnd: (label: string) => {
    if (isDev) console.timeEnd(label)
  }
}

export const { log, info, warn, error, debug, group, groupEnd, time, timeEnd } = logger

export const devLog = (...args: any[]) => {
  if (isDev) {
    console.log('[DEV-ONLY]', ...args)
  }
}

export const prodLog = (...args: any[]) => {

  if (process.env.NODE_ENV === 'production') {
    console.log('[PROD]', ...args)
  } else {
    console.log('[PROD-LOG]', ...args)
  }
}