import { useCallback, useReducer, ChangeEvent } from "react";
import Layout from "../components/Layout";

interface State {
	uppercases: boolean;
	lowercases: boolean;
	numbers: boolean;
	length: number;
	count: number;
}

interface Action {
	type: "uppercases" | "lowercases" | "numbers" | "length" | "count";
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
	const changeState = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		// TODO: Change state
	}, []);
	const generateStrings = useCallback(() => {
		// TODO: Generate random strings
	}, [state]);

	// TODO: Add elements
	return (
		<Layout>
			<h1>무작위 문자열 생성</h1>
		</Layout>
	);
}
