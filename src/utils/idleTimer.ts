

const idleTimer = (cb: () => void): void => {
    tracker();
    startInterval(cb);
}

const startInterval = (cb: () => void) => {
    updateExpiredTime();
    const interval = setInterval(() => {
        const expiredTime = Number.parseInt(localStorage.getItem("expiredTime") || "0");
        if(expiredTime> 0 && Date.now() >  expiredTime) cleanUp(interval, cb)
    }, 1000)
}

const updateExpiredTime = () => {
    localStorage.setItem("expiredTime", (Date.now() + 1000*60*10 ).toString())
}

const tracker = () => {
    window.addEventListener("mousemove", updateExpiredTime)
    window.addEventListener("scroll", updateExpiredTime)
    window.addEventListener("keydown", updateExpiredTime)
}

const cleanUp = (interval: NodeJS.Timeout, cb: () => void) => {
    cb();
    localStorage.removeItem("expiredTime");
    clearInterval(interval);
    window.removeEventListener("mousemove", updateExpiredTime)
    window.removeEventListener("scroll", updateExpiredTime)
    window.removeEventListener("keydown", updateExpiredTime)
}


export default idleTimer;