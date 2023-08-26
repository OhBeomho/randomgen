import { styled } from "styled-components";
import { Input } from "../components/Input.styled";
import Layout from "../components/Layout";
import { useReducer, useCallback, ChangeEvent, useState } from "react";

const Settings = styled.div`
	display: flex;
	align-items: center;
	text-align: center;

	& > * {
		flex: 1;
	}
`;

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

interface Error {
	type: string;
	message: string;
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
	const [error, setError] = useState<Error | null>(null);
	const changeState = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const { id: type, value, min, max } = e.target;
		const minValue = Number(min),
			maxValue = Number(max);
		const payload = Number(value);

		if (type !== "rangeStart" && type !== "rangeEnd" && type !== "count") {
			return;
		}

		dispatch({ type, payload: payload || 0 });
		e.target.value = value.replace(/0{1,}[1-9]/g, "");

		let message;
		if (payload < minValue) {
			message = `최소값(${minValue})보다 작습니다.`;
		} else if (max && payload > maxValue) {
			message = `최대값(${maxValue})보다 작습니다.`;
		}

		if (message) {
			setError({ type, message });
			return;
		}
	}, []);
	const getWidthStyle = useCallback(
		(value: number) => ({ width: (String(value).length + 1) * 16 }),
		[]
	);
	const getRandomNumbers = useCallback(() => {
		// const { rangeStart, rangeEnd, count } = state;
	}, [state]);

	// TODO: Make settings
	return (
		<Layout>
			<h1>무작위 수 생성</h1>
			<Settings>
				<div>
					범위
					<br />
					<Input
						type="number"
						id="rangeStart"
						min={0}
						max={state.rangeEnd - 1}
						value={state.rangeStart}
						style={getWidthStyle(state.rangeStart)}
						onChange={changeState}
					/>
					~
					<Input
						type="number"
						id="rangeEnd"
						min={state.rangeStart + 1}
						value={state.rangeEnd}
						style={getWidthStyle(state.rangeEnd)}
						onChange={changeState}
					/>
				</div>
				<div>
					개수
					<br />
					<Input
						type="number"
						id="count"
						min={1}
						max={1000}
						value={state.count}
						style={getWidthStyle(state.count)}
						onChange={changeState}
					/>
				</div>
			</Settings>
			{error && <div style={{ color: "rgb(200, 0, 0)" }}>{error.message}</div>}
		</Layout>
	);
}
