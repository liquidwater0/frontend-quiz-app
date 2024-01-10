import { useQuiz } from "../../context/QuizContext";
import { Button } from "../Buttons";
import QuizTitle from "../QuizTitle";

export default function ScoreDisplay() {
    const { selectedQuiz, score, setSelectedQuiz, setScore, setQuizComplete } = useQuiz();

    function handlePlayAgain() {
        setSelectedQuiz(null);
        setQuizComplete(false);
        setScore(0);
    }

    return (
        <section className="score-display">
            <div>
                <h1 className="font-regular">
                    Quiz completed
                    <br />
                    <span className="font-medium">
                        You scored...
                    </span>
                </h1>
            </div>

            <div>
                <div className="score-card shadow">
                    <QuizTitle />
                    <p className="score">{ score }</p>
                    <p className="subtitle">
                        out of { selectedQuiz?.questions.length }
                    </p>
                </div>

                <Button onClick={handlePlayAgain}>
                    Play Again
                </Button>
            </div>
        </section>
    );
}