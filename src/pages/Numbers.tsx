import { Input } from "../components/Input.styled";
import Layout from "../components/Layout";
import { useReducer, useCallback, ChangeEvent, useState } from "react";
import { Button } from "../components/Button.styled";
import { Settings } from "../components/Settings";

type ActionType = "range1" | "range2" | "count";

interface State {
	range1: number;
	range2: number;
	count: number;
}

interface Action {
	type: ActionType;
	payload: number;
}

function reducer(state: State, action: Action): State {
	const { type, payload } = action;

	switch (type) {
		case "range1":
			return { ...state, range1: payload };
		case "range2":
			return { ...state, range2: payload };
		case "count":
			return { ...state, count: payload };
	}
}

export default function () {
	const [state, dispatch] = useReducer(reducer, { range1: 0, range2: 100, count: 10 });
	const [numbers, setNumbers] = useState<number[]>([]);
	const changeState = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({ type: name as ActionType, payload: Number(value) || 0 });

		if (value.startsWith("0")) {
			e.target.value = value.replace(/0{1,}[1-9]/g, "");
		}
	}, []);
	const getWidthStyle = useCallback(
		(value: number) => ({ width: (String(value).length + 1) * 16 }),
		[]
	);
	const generateNumbers = useCallback(() => {
		const { range1, range2, count } = state;
		const min = range1 > range2 ? range2 : range1;
		const max = range1 > range2 ? range1 : range2;
		const result: number[] = [];

		if (range1 < 0 || range2 || 0) {
			alert("범위는 0 이상이여야 합니다.");
			return;
		}

		for (let i = 0; i < count; i++) {
			result.push(Math.round(Math.random() * (max - min) + min));
		}

		setNumbers(() => result);
	}, [state]);

	return (
		<Layout>
			<h1>무작위 수 생성</h1>
			<Settings $rows={1} $columns={2}>
				<div>
					<b>범위</b>
					<br />
					<Input
						type="number"
						name="range1"
						value={state.range1}
						min={0}
						style={getWidthStyle(state.range1)}
						onChange={changeState}
					/>
					~
					<Input
						type="number"
						name="range2"
						value={state.range2}
						min={0}
						style={getWidthStyle(state.range2)}
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
						max={1000}
						value={state.count}
						style={getWidthStyle(state.count)}
						onChange={changeState}
					/>
				</div>
			</Settings>
			<Button onClick={generateNumbers}>생성</Button>
			<div
				style={{
					marginTop: 20,
					width: "95vw",
					maxWidth: 500,
					wordBreak: "break-word",
					textAlign: "center"
				}}
			>
				{numbers.join(" ")}
			</div>
		</Layout>
	);
}
