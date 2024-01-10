import { useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import { Button, OptionButton } from "../Buttons";
import Icon from "../Icon";
import ProgressBar from "../ProgressBar";
import correctIcon from "../../assets/images/icon-correct.svg";
import errorIcon from "../../assets/images/icon-error.svg";

export default function QuestionDisplay() {
    const { selectedQuiz, setScore, setQuizComplete } = useQuiz();
    const [shuffledQuestions] = useState(() => {
        const questionCopy = [...selectedQuiz!.questions];
        questionCopy.forEach((question: any) => question.sort = Math.random());
        return questionCopy.sort((a: any, b: any) => a.sort - b.sort);
    });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasBeenAnswered, setHasBeenAnswered] = useState<boolean>(false);
    const [submittedWithoutSelection, setSubmittedWithoutSelection] = useState<boolean>(false);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const questionCount = shuffledQuestions.length;

    function submitAnswer() {
        if (selectedOption === null) {
            setSubmittedWithoutSelection(true);
            return;
        }

        if (selectedOption === currentQuestion.answer) {
            setScore(currentScore => currentScore + 1);
        }
        
        setHasBeenAnswered(true);
        setSubmittedWithoutSelection(false);
    }

    function setNextQuestion() {
        if (currentQuestionIndex === questionCount - 1) {
            setQuizComplete(true);
        } else {
            setCurrentQuestionIndex(currentIndex => currentIndex + 1);
        }
        
        setSelectedOption(null);
        setHasBeenAnswered(false);
    }

    function handleOptionSelect(option: string) {
        if (hasBeenAnswered) return;

        setSelectedOption(currentOption => {
            if (option === currentOption) {
                return null
            } else {
                return option;
            }
        });
    }

    function getIsCorrectClass(option: string) {
        if (!hasBeenAnswered) return "";

        if (option === currentQuestion.answer) {
            return "correct";
        } else {
            return "incorrect";
        }
    }

    return (
        <section className="question-display">
            <div>
                <p className="subtitle">
                    Question { currentQuestionIndex + 1 } of { questionCount }
                </p>

                <h2 className="question-title">
                    { currentQuestion.question }
                </h2>

                <ProgressBar 
                    className="question-progress"
                    value={((currentQuestionIndex + 1) / questionCount) * 100} 
                />
            </div>

            <ul>
                {currentQuestion.options.map((option, index) => {
                    const letters = ["A", "B", "C", "D"];
                    const isCorrect = option === currentQuestion.answer;
                    const isSelected = option === selectedOption;
                    const iconClass =
                        hasBeenAnswered && isSelected && isCorrect ?
                        "correct" :
                        hasBeenAnswered && isSelected && !isCorrect ?
                        "incorrect" : "";

                    return (
                        <li key={option}>
                            <OptionButton
                                className={`${isSelected ? "selected" : ""} ${hasBeenAnswered ? "no-hover" : ""} ${getIsCorrectClass(option)}`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                <Icon 
                                    className={iconClass}
                                    icon={ letters[index] } 
                                />
                                { option }
                                { 
                                    hasBeenAnswered && isCorrect ? 
                                    <img 
                                        className="option-icon"
                                        src={correctIcon} 
                                        alt="correct icon" 
                                    /> : 
                                    hasBeenAnswered && !isCorrect && isSelected ?
                                    <img 
                                        className="option-icon"
                                        src={errorIcon} 
                                        alt="error icon" 
                                    /> : "" 
                                }
                            </OptionButton>
                        </li>
                    );
                })}

                <li>
                    <Button onClick={hasBeenAnswered ? setNextQuestion : submitAnswer}>
                        { hasBeenAnswered ? "Next Question" : "Submit Answer" }
                    </Button>

                    {
                        submittedWithoutSelection &&
                        <div className="submit-error">
                            <img 
                                src={errorIcon} 
                                alt="error icon" 
                            />

                            <p className="error-message">
                                Please select an answer
                            </p>
                        </div>
                    }
                </li>
            </ul>
        </section>
    );
}