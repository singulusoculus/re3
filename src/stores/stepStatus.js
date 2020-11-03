import { writable } from 'svelte/store'

const stepsEnabled = writable({
    start: true,
    list: false,
    rank: false,
    result: false
})

const customStepsEnabled = {
    subscribe: stepsEnabled.subscribe,
    setSteps: (newSteps) => {
        stepsEnabled.set(newSteps)
    },
    toggleStep: (step) => {
        stepsEnabled.update(steps => {
            steps[step] = !steps[step]
            return steps
        })
    },
    enableStart: () => {
        stepsEnabled.set({start:true, list:false, rank:false, result:false})
    },
    enableList: () => {
        stepsEnabled.set({start:true, list:true, rank:false, result:false})
    },
    enableRank: () => {
        stepsEnabled.set({start:true, list:true, rank:true, result:false})
    },
    enableResult: () => {
        stepsEnabled.set({start:true, list:true, rank:true, result:true})
    },
    disableStep: (step) => {
        stepsEnabled.update(steps => {
            steps[step] = false
            return steps
        })
    },
    enableStep: (step) => {
        stepsEnabled.update(steps => {
            steps[step] = true
            return steps
        })
    }
}

export default customStepsEnabled