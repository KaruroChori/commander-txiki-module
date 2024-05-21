export class EventEmitter {
    listeners = [];

    emit(eventName, ...data) {
        for (const l of this.listeners.filter(({ name }) => name === eventName)) {
            setTimeout(() => {
                l.callback.apply(this, [this, ...data]);
            }, 0)
        }
    }

    on(name, callback) {
        if (typeof name === 'string' && typeof callback === 'function') {
            this.listeners.push({ name, callback });
        }
    }

    off(eventName, callback) {
        this.listeners = this.listeners.filter(listener => {
            !(listener.name === eventName &&
                listener.callback === callback)
        })
    }

    destroy() {
        this.listeners.length = 0;
    }

    listenerCount(eventName, listener = undefined) {
        return this.listeners.filter(x => {
            if (x.callback !== undefined) return x.callback === listener;
            else {
                return x.name === eventName
            }
        }).length
    }
}

export const childProcess = {
    spawn: tjs.spawn
}


export const fs = {
    existsAsync: async (filename) => {
        return (await tjs.stat(filename))!==undefined
    },

    realpathAsync: async (filename) => {
        return tjs.realpath(filename)
    }
}


export const process = {
    stdout: {
        ...tjs.stdout,
        write: (text) => {
            tjs.stdout.write(new TextEncoder().encode(text));
        }

    },
    stderr: {
        ...tjs.stderr,
        write: (text) => {
            tjs.stderr.write(new TextEncoder().encode(text));
        }
    },
    stdin: tjs.stdin,
    exit: tjs.exit,
    versions: tjs.versions,
    platform: tjs.platform,
    argv: tjs.args,
    defaultApp: undefined,
    on: tjs.addSignalListener,
    get execArgv() {
        //throw new Error("Not implemented")
        return []
    },
    get execPath() {
        throw new Error("Not implemented")
    }
}