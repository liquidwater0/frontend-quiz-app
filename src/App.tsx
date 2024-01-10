import "./scss/App.scss";
import { useEffect, useRef } from 'react';
import { useQuiz } from "./context/QuizContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { QuizSelectDisplay, QuestionDisplay, ScoreDisplay } from "./components/Displays";
import Switch, { type SwitchMethods } from "./components/Switch";
import Background from "./components/Background";
import QuizTitle from "./components/QuizTitle";

import moonDark from "./assets/images/icon-moon-dark.svg";
import moonLight from "./assets/images/icon-moon-light.svg";
import sunDark from "./assets/images/icon-sun-dark.svg";
import sunLight from "./assets/images/icon-sun-light.svg";

export type Theme = "dark" | "light";

function App() {
	const { selectedQuiz, quizComplete } = useQuiz();
	const [theme, setTheme] = useLocalStorage<Theme>("quiz-theme", "dark");
	const themeSwitchRef = useRef<SwitchMethods>(null);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<>
			<header className="container">
				{
					selectedQuiz !== null &&
					<QuizTitle />
				}

				<div className="theme-switch-container">
					<img 
						src={theme === "dark" ? sunLight : sunDark} 
						alt={theme === "dark" ? "sun light icon" : "sun dark icon"}
						onClick={() => themeSwitchRef.current?.toggle()}
					/>
					<Switch
						checked={theme === "dark"}
						aria-label="dark theme switch"
						onSwitchChange={checked => setTheme(checked ? "dark" : "light")}
						ref={themeSwitchRef}
					/>
					<img 
						src={theme === "dark" ? moonLight : moonDark} 
						alt={theme === "dark" ? "moon light icon" : "moon dark icon"}
						onClick={() => themeSwitchRef.current?.toggle()}
					/>
				</div>
			</header>
			<main className="container">
				<Background theme={theme}/>
				
				{
					quizComplete ? (
						<ScoreDisplay />
					) : (
						<>
						{
							selectedQuiz === null ?
							<QuizSelectDisplay /> :
							<QuestionDisplay />
						}
						</>
					)
				}
			</main>
		</>
	);
}

export default App;