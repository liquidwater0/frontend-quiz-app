import data from "../data.json";
import "../icons";
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
    const [icons] = useState<Record<string, string>>(() => {
        const iconObject: Record<string, string> = {};

        quizData.quizzes.forEach(quiz => {
            const fileName = quiz.icon.split("images/")[1];
            
            if (import.meta.env.PROD) {
                iconObject[quiz.title] = `${import.meta.env.BASE_URL}assets/${fileName}`;
            }

            if (import.meta.env.DEV) {
                iconObject[quiz.title] = `/src/assets/images/${fileName}`;
            }
        });

        return iconObject;
    });

    return (
        <QuizContext.Provider value={{ 
            quizData,
            selectedQuiz,
            score, 
            quizComplete,
            setSelectedQuiz,
            setScore,
            setQuizComplete,
            icons
        }}>
            { children }
        </QuizContext.Provider>
    );
}