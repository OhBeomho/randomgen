import { useCallback, useReducer, ChangeEvent, useState } from "react";
import Layout from "../components/Layout";
import { Settings } from "../components/Settings";
import { Input } from "../components/Input.styled";
import { Button } from "../components/Button.styled";

type ActionType = "uppercases" | "lowercases" | "numbers" | "length" | "count";

interface State {
	uppercases: boolean;
	lowercases: boolean;
	numbers: boolean;
	length: number;
	count: number;
}

interface Action {
	type: ActionType;
	payload: number | boolean;
}

function reducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case "length":
			return { ...state, length: Number(payload) };
		case "count":
			return { ...state, count: Number(payload) };
		case "uppercases":
		case "lowercases":
		case "numbers":
			return { ...state, [type]: Boolean(payload) };
	}
}

export default function () {
	const [state, dispatch] = useReducer(reducer, {
		uppercases: false,
		lowercases: true,
		numbers: true,
		length: 10,
		count: 5
	});
	const [strings, setStrings] = useState<string[]>([]);
	const changeState = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value, checked } = e.target;

			if (e.target.type === "number") {
				dispatch({ type: name as ActionType, payload: Number(value) || 0 });
				if (value.startsWith("0")) {
					e.target.value = value.replace(/0{1,}[1-9]/g, "");
				}
			} else if (e.target.type === "checkbox") {
				const { uppercases, lowercases, numbers } = state;
				const obj = { uppercases, lowercases, numbers, [name]: checked };
				if (Object.values(obj).every((e) => !e)) {
					e.target.checked = true;
					return;
				}

				dispatch({ type: name as ActionType, payload: checked });
			}
		},
		[state]
	);
	const generateStrings = useCallback(() => {
		const { uppercases, lowercases, numbers, length, count } = state;
		const functions: (() => string)[] = [];
		const result: string[] = [];

		if (uppercases) {
			functions.push(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
		}

		if (lowercases) {
			functions.push(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)));
		}

		if (numbers) {
			functions.push(() => String(Math.floor(Math.random() * 10)));
		}

		for (let i = 0; i < count; i++) {
			let str = "";

			for (let j = 0; j < length; j++) {
				let c;

				if (functions.length > 1) {
					c = functions[Math.floor(Math.random() * functions.length)]();
				} else {
					c = functions[0]();
				}

				str += c;
			}

			result.push(str);
		}

		setStrings(() => result);
	}, [state]);

	// TODO: Add elements
	return (
		<Layout>
			<h1>무작위 문자열 생성</h1>
			<Settings $rows={2} $columns={2}>
				<div>
					<b>문자열 길이</b>
					<br />
					<Input
						type="number"
						name="length"
						min={1}
						value={state.length}
						onChange={changeState}
					/>
				</div>
				<div>
					<b>개수</b>
					<br />
					<Input
						type="number"
						name="count"
						min={1}
						value={state.count}
						onChange={changeState}
					/>
				</div>
				<div style={{ gridColumn: "1 / 3" }}>
					<b>문자열 구성</b>
					<br />
					알파벳 대문자 (A-Z)
					<input type="checkbox" name="uppercases" onChange={changeState} />
					<br />
					알파벳 소문자 (a-z)
					<input
						type="checkbox"
						name="lowercases"
						defaultChecked
						onChange={changeState}
					/>
					<br />
					숫자 (0-9)
					<input type="checkbox" name="numbers" defaultChecked onChange={changeState} />
				</div>
			</Settings>
			<Button onClick={generateStrings}>생성</Button>
			<div style={{ marginTop: 20 }}>
				{strings.map((str, index) => (
					<div style={{ fontFamily: "monospace", fontSize: 16 }} key={index}>
						{str}
					</div>
				))}
			</div>
		</Layout>
	);
}
