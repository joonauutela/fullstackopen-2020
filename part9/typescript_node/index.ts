import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises } from './excerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (weight && height) {
        const bmiJson = {
            weight,
            height,
            bmi: calculateBmi(height, weight)
        };
        res.status(200).json(bmiJson);
    } else {
        res.status(400).json({ error: 'malformatted parameters' });
    }
});

app.post('/excercises', (req, res) => {
    const dailyExercises: any = req.body.daily_exercises;
    const target = Number(req.body.target);
    if (dailyExercises instanceof (Array) && target) {
        res.status(200).json((calculateExcercises(dailyExercises, target)));
    } else {
        res.status(400).json({ error: 'malformatted parameters' });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});