import { ChangeEvent, useEffect, useState } from "react"
import DeveloperInfo from "./components/DeveloperInfo"

export default function App() {
	const texts = [
		`The first popular web browser with a graphical user interface, Mosaic, was released in 1993. Accessible to non-technical people, it played a prominent role in the rapid growth of the nascent World Wide Web. The lead developers of Mosaic then founded the Netscape corporation, which released a more polished browser, Netscape Navigator, in 1994. This quickly became the most-used.`,
		`The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is frequently assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.`,
		`CSS is designed to enable the separation of content and presentation, including layout, colors, and fonts. This separation can improve content accessibility; provide more flexibility and control in the specification of presentation characteristics.`,
	]

	const allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890,.;:-()'\" "

	const [typed, setTyped] = useState("")
	const [correctChars, setCorrectChars] = useState(0)
	const [startTime, setStartTime] = useState<Date | null>(null)
	const [endTime, setEndTime] = useState<Date | null>(null)
	const [finished, setFinished] = useState(false)
	const [started, setStarted] = useState(false)
	const [text, setText] = useState(
		texts[Math.floor(Math.random() * texts.length)]
	)

	function onKeyPressed({ key }: KeyboardEvent) {
		setStarted(true)

		if (key === "Backspace") {
			setTyped((prevTyped) => prevTyped.slice(0, -1))
		}

		if (allowedChars.indexOf(key.toLowerCase()) === -1) return

		setTyped((prevTyped) => prevTyped + key)
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setStarted(true)

		if (allowedChars.indexOf(e.target.value.slice(-1).toLowerCase()) === -1)
			return

		setTyped(e.target.value)
	}

	useEffect(() => {
		if (started) {
			setStartTime(new Date())
		}
	}, [started])

	useEffect(() => {
		if (finished) {
			setEndTime(new Date())
		}
	}, [finished])

	useEffect(() => {
		if (typed.length === text.length && !finished) {
			setFinished(true)
			setEndTime(new Date())
			let correctChars = 0
			text.split("").map((letter, index) => {
				if (typed[index].toLowerCase() === letter.toLowerCase()) {
					correctChars++
				}
			})
			setCorrectChars(correctChars)
		}
	}, [typed])

	useEffect(() => {
		document.addEventListener("keydown", onKeyPressed)

		return () => {
			document.removeEventListener("keydown", onKeyPressed)
		}
	}, [])

	if (finished && startTime && endTime) {
		return (
			<div className="md:min-h-screen w-full flex justify-center items-center p-8 relative">
				<div className="max-w-lg w-full flex flex-col justify-center items-center">
					<p className="text-2xl font-semibold">
						{Math.floor((100 * correctChars) / text.length)}%
					</p>
					<p>
						Words per minute:{" "}
						{Math.ceil(
							text.length /
								5 /
								((endTime!.getTime() - startTime!.getTime()) /
									1000 /
									60)
						)}
					</p>
					<p>
						Time:{" "}
						{Math.floor(
							(endTime!.getTime() - startTime!.getTime()) / 1000
						)}{" "}
						seconds
					</p>
					<button
						className="bg-neutral-900 text-white px-4 h-12 rounded mt-6"
						onClick={() => {
							setStarted(false)
							setFinished(false)
							setCorrectChars(0)
							setEndTime(null)
							setStartTime(null)
							setTyped("")
							setText(
								texts[Math.floor(Math.random() * texts.length)]
							)
						}}
					>
						RESTART
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="md:min-h-screen w-full flex flex-col justify-center items-center p-8 relative">
			<h1 className="text-2xl font-semibold mb-6">Type the text below</h1>
			<div className="max-w-lg w-full flex flex-col justify-center items-center mb-6">
				<p className="w-full text-xl text-justify">
					{text.split("").map((letter, index) => (
						<span
							key={index}
							className={
								index <= typed.length - 1
									? typed[index].toLowerCase() ===
									  letter.toLowerCase()
										? "bg-green-200"
										: "bg-red-300"
									: ""
							}
						>
							{letter}
						</span>
					))}
				</p>
				<div className="flex self-end justify-center items-center h-14 w-14 rounded mt-6 bg-neutral-900 relative z-10 md:hidden">
					<input
						type="text"
						className="h-full w-full text-transparent bg-transparent outline-0 select-none"
						autoCapitalize="none"
						autoComplete="none"
						autoCorrect="none"
						spellCheck="false"
						value={typed}
						onClick={(e) => {
							e.currentTarget.setSelectionRange(
								e.currentTarget.value.length,
								e.currentTarget.value.length
							)
						}}
						onChange={handleInputChange}
					/>
					<svg
						width="23px"
						height="30px"
						viewBox="0 0 23 30"
						className="absolute -z-10"
					>
						<path
							d="M22.75,16.25 L22.75,29.75 L0.25,29.75 L0.25,16.25 L22.75,16.25 Z M1.75,17.75 L1.75,28.25 L21.25,28.25 L21.25,17.75 L1.75,17.75 Z M3,25 L5,25 L5,27 L3,27 L3,25 Z M6,25 L17,25 L17,27 L6,27 L6,25 Z M18,25 L20,25 L20,27 L18,27 L18,25 Z M3,22 L5,22 L5,24 L3,24 L3,22 Z M6,22 L8,22 L8,24 L6,24 L6,22 Z M9,22 L11,22 L11,24 L9,24 L9,22 Z M12,22 L14,22 L14,24 L12,24 L12,22 Z M15,22 L17,22 L17,24 L15,24 L15,22 Z M18,22 L20,22 L20,24 L18,24 L18,22 Z M18,19 L20,19 L20,21 L18,21 L18,19 Z M15,19 L17,19 L17,21 L15,21 L15,19 Z M12,19 L14,19 L14,21 L12,21 L12,19 Z M9,19 L11,19 L11,21 L9,21 L9,19 Z M6,19 L8,19 L8,21 L6,21 L6,19 Z M12.5,3.90819544 L12.5,13 L10.5,13 L10.5,3.91734897 L7.71024219,6.70710678 L6.29602863,5.29289322 L11.5045768,0.0843450802 L16.6811262,5.26089447 L15.2669126,6.67510803 L12.5,3.90819544 Z M3,19 L5,19 L5,21 L3,21 L3,19 Z"
							fill="#FFFFFF"
							fillRule="nonzero"
						></path>
					</svg>
				</div>
			</div>
			<DeveloperInfo />
		</div>
	)
}
