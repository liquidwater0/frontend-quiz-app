import data from "../data.json";
import { htmlIcon, cssIcon, jsIcon, accessibilityIcon } from "../quizIcons";
import { useState, useContext, createContext } from "react";
import type { SetStateAction, Dispatch, ReactNode } from "react";

type QuizData = typeof data;
type Quiz = QuizData["quizzes"][0];

interface QuizContextType {
    quizData: QuizData,
    selectedQuiz: Quiz | null,
    score: number,
    quizComplete: boolean,
    icons: Record<string, string>
    setSelectedQuiz: Dispatch<SetStateAction<Quiz | null>>,
    setScore: Dispatch<SetStateAction<number>>,
    setQuizComplete: Dispatch<SetStateAction<boolean>>,
}

const QuizContext = createContext<QuizContextType>(null!);

export function useQuiz() {
    const context = useContext(QuizContext);

    if (!context) {
        console.log("QuizContext: No Provider");
    }

    return context;
}

export default function QuizProvider({ children }: { children: ReactNode }) {
    const quizData = data;
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [score, setScore] = useState<number>(0);
    const [quizComplete, setQuizComplete] = useState<boolean>(false);
    const icons = {
        html: htmlIcon,
        css: cssIcon,
        javascript: jsIcon,
        accessibility: accessibilityIcon
    }

    return (
        <QuizContext.Provider value={{ 
            quizData,
            selectedQuiz,
            score, 
            quizComplete,
            icons,
            setSelectedQuiz,
            setScore,
            setQuizComplete
        }}>
            { children }
        </QuizContext.Provider>
    );
}