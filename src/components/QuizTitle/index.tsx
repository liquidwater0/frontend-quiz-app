import "./index.scss";
import type { HTMLAttributes } from "react";
import { useQuiz } from "../../context/QuizContext";
import Icon from "../Icon";

interface QuizTitleProps extends HTMLAttributes<HTMLDivElement> {}

export default function QuizTitle({ className, ...props }: QuizTitleProps) {
    const { selectedQuiz, icons } = useQuiz();

    return (
        <div 
            className={`quiz-title-container ${className ? className : ""}`}
            { ...props }
        >
            <Icon 
                iconStyle={selectedQuiz?.title.toLowerCase()}
                icon={ 
                    <img 
                        src={icons[selectedQuiz!.title.toLowerCase()]} 
                        alt={`${selectedQuiz!.title.toLowerCase()} icon`}
                    /> 
                } 
            />
            
            <p className="quiz-title">
                { selectedQuiz?.title }
            </p>
        </div>
    );
}