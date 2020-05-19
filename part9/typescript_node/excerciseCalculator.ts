interface ExcerciseCalculator {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ArgumentParser {
    targetArg: number;
    workoutDaysArg: number[];
}

const parseArguments = (args: string[]): ArgumentParser => {
    const targetArg = Number(args[2]);
    const workoutDaysArg: number[] = [];

    const workoutDaysTmp: string[] = args.slice(3, args.length);
    const regex = RegExp(/^[0-9\s]*$/);

    // Convert string-array to number-array
    workoutDaysTmp.map(argument => {
        if (regex.exec(argument) === null) {
            throw new Error('Non-number detected. Only use numbers.');
        }
        workoutDaysArg.push(Number(argument));
    });
    return {
        targetArg,
        workoutDaysArg
    };
};

export const calculateExcercises = (workoutDays: number[], targetHours: number): ExcerciseCalculator => {
    let trainingDays = 0;
    let totalWorkoutHours = 0;

    workoutDays.map(workoutHours => {
        totalWorkoutHours += workoutHours;
        if (workoutHours > 0) trainingDays++;
    });

    const average = totalWorkoutHours / workoutDays.length;

    let rating = 0;
    let success = false;
    let ratingDescription = '';

    if (average >= targetHours) {
        success = true;
        if (average - targetHours > 1) {
            rating = 3;
            ratingDescription = 'great job';
        }
        else {
            rating = 2;
            ratingDescription = 'good job';
        }
    } else {
        rating = 1;
        ratingDescription = 'bad job';
    }

    return {
        periodLength: workoutDays.length,
        trainingDays,
        success,
        rating: rating,
        ratingDescription,
        target: targetHours,
        average
    };
};

try {
    // Makes sure not to invoke 'catch'-error when calculateExcercises() is called outside this file
    if (process.argv.length !== 2) {
        const { targetArg, workoutDaysArg } = parseArguments(process.argv);
        console.log(calculateExcercises(workoutDaysArg, targetArg));
    }
} catch (e) {
    console.log(e);
}