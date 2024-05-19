export class EventEmitter {
    listeners = [];

    emit(eventName, data) {
        this.listeners.filter(({ name }) => name === eventName)
            .forEach(({ callback }) => {
                setTimeout(() => {
                    callback.apply(this, [this, ...data]);
                }, 0)
            })
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
    });
    h.catch((x) => {
        ready = true;
        throw new Error(x)
    });
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
    stdout: tjs.stdout,
    stdin: tjs.stdin,
    stderr: tjs.stderr
    exit: tjs.exit,
    versions: tjs.versions,
    platform: tjs.platform,
    argv: tjs.args,
    defaultApp: undefined,
    on: tjs.addSignalListener
    get execArgv() {
        throw new Error("Not implemented")
    }
    get execPath() {
        throw new Error("Not implemented")
    }
}