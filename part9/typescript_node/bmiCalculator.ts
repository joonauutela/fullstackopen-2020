interface ArgumentParserBmi {
    weightArg: number;
    heightArg: number;
}

const parseArgumentsBMI = (args: Array<string>): ArgumentParserBmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weightArg: Number(args[2]),
            heightArg: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi > 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else {
        return 'Not normal (unhealthy weight)';
    }
};

try {
    // Makes sure not to invoke 'catch'-error when calculateBmi() is called outside this file
    if (process.argv.length !== 2) {
        const { weightArg, heightArg } = parseArgumentsBMI(process.argv);
        console.log(calculateBmi(heightArg, weightArg));
    }
} catch (e) {
    console.log(e);
}

