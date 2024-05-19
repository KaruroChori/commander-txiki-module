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


function syncfy(fn) {
    const h = fn();
    let ready = false;
    let res = undefined;
    h.then((x) => {
        ready = true;
        res = x;
        console.log('YAY')
    });
    h.catch((x) => {
        ready = true;
        throw new Error(x)
    });
    h.finally(x => {
        console.log('YAY')

    })
    while (!ready) { }
    return res;
}


export const fs = {
    existsAsync: (filename) => {
        const h = syncfy(() => tjs.open(filename))
        syncfy(() => tjs.close(filename))

        if (h !== undefined) return true;
        return false;
    },

    realpathSync: (filename) => {
        return syncfy(() => tjs.realpath(filename))
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