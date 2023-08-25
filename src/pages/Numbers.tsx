import Layout from "../components/Layout";
import { useReducer, useCallback, ChangeEvent } from "react";

type ActionType = "rangeStart" | "rangeEnd" | "count";

interface State {
	rangeStart: number;
	rangeEnd: number;
	count: number;
}

interface Action {
	type: ActionType;
	payload: number;
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "rangeStart":
			return { ...state, rangeStart: action.payload };
		case "rangeEnd":
			return { ...state, rangeEnd: action.payload };
		case "count":
			return { ...state, count: action.payload };
	}
}

export default function () {
	const [state, dispatch] = useReducer(reducer, { rangeStart: 0, rangeEnd: 100, count: 10 });
	const changeRange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name: type, valueAsNumber: payload } = e.target;

		if (type !== "rangeStart" && type !== "rangeEnd") {
			return;
		}

		if (type === "rangeStart" && payload >= state.rangeEnd) {
			dispatch({ type, payload: state.rangeEnd - 1 });
		} else if (type === "rangeEnd" && payload <= state.rangeStart) {
			dispatch({ type, payload: state.rangeStart + 1 });
		} else {
			dispatch({ type, payload });
		}
	}, []);

	// TODO: Complete this page in next session.

	return (
		<Layout>
			<h1>무작위 수 생성</h1>
			<p>
				범위
				<br />
				<input
					type="number"
					name="rangeStart"
					min={0}
					max={state.rangeEnd - 1}
					value={state.rangeStart}
					onChange={changeRange}
				/>
				~
				<input
					type="number"
					name="rangeEnd"
					min={state.rangeStart + 1}
					max={1000}
					value={state.rangeEnd}
					onChange={changeRange}
				/>
			</p>
		</Layout>
	);
}
