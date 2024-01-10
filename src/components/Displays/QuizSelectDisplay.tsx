import { useQuiz } from "../../context/QuizContext";
import { OptionButton } from "../Buttons";
import Icon from "../Icon";

export default function QuizSelectDisplay() {
    const { quizData, icons, setSelectedQuiz } = useQuiz();
    
    return (
        <section className="quiz-select-display">
            <div>
                <h1 className="welcome-title font-regular">
                    Welcome to the 
                    <br />
                    <span className="font-medium">
                        Frontend Quiz!
                    </span>
                </h1>
                <p className="subtitle">
                    Pick a subject to get started.
                </p>
            </div>
            
            <ul>
                {quizData.quizzes.map(quiz => (
                    <li key={quiz.title}>
                        <OptionButton 
                            className="quiz-select-button"
                            onClick={() => setSelectedQuiz(quiz)}
                        >
                            <Icon 
                                iconStyle={quiz.title.toLowerCase()}
                                icon={ 
                                    <img 
                                        src={icons[quiz.title.toLowerCase()]} 
                                        alt={`${quiz.title.toLowerCase()} icon`}
                                    /> 
                                } 
                            />
                            { quiz.title }
                        </OptionButton>
                    </li>
                ))}
            </ul>
        </section>
    );
}