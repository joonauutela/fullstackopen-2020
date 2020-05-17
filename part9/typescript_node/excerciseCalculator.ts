interface IExcerciseCalculator {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface IArgumentParser {
    targetArg: number,
    workoutDaysArg: number[]
}

const parseArguments = (args: string[]): IArgumentParser => {
    const targetArg: number = Number(args[2])
    let workoutDaysArg: number[] = []

    const workoutDaysTmp: string[] = args.slice(3, args.length)

    // Convert string-array to number-array
    workoutDaysTmp.map(argument => {
        if (argument.match(/^[0-9\s]*$/) === null) {
            throw new Error('Non-number detected. Only use numbers.')
        }
        workoutDaysArg.push(Number(argument))
    })
    return {
        targetArg,
        workoutDaysArg
    }
}

const calculateExcercises = (workoutDays: number[], targetHours: number): IExcerciseCalculator => {
    let trainingDays = 0
    let totalWorkoutHours = 0

    workoutDays.map(workoutHours => {
        totalWorkoutHours += workoutHours
        if (workoutHours > 0) trainingDays++
    })

    const average = totalWorkoutHours / workoutDays.length

    let rating = 0
    let success = false
    let ratingDescription = ''

    if (average > targetHours) {
        success = true
        if (average - targetHours > 1) {
            rating = 3
            ratingDescription = 'great job'
        }
        else {
            rating = 2
            ratingDescription = 'good job'
        }
    } else {
        rating = 1
        ratingDescription = 'bad job'
    }

    return {
        periodLength: workoutDays.length,
        trainingDays,
        success,
        rating: rating,
        ratingDescription,
        target: targetHours,
        average
    }
}

try {
    const { targetArg, workoutDaysArg } = parseArguments(process.argv)
    console.log(calculateExcercises(workoutDaysArg, targetArg))
} catch (e) {
    console.log(e)
}