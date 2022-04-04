
export const slideInDown = {
    initial: {
        y: -100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, 0.01, 0.00]
        }
    }
}
export const slideInUp = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, 0.01, 0.00]
        }
    }
}

export const slideInLeft = {
    initial: {
        x:100,
        opacity: 0
    },
    animate: {
        x:0,
        opacity: 1,
        transition: {
            duration: 1,
            
        }
    }
}