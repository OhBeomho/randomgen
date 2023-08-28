import { DetailedHTMLProps, FormEvent, InputHTMLAttributes, useCallback, useState } from "react";
import { styled } from "styled-components";
import { getTextWidth } from "../utils";

const StyledInput = styled.input`
	all: unset;
	padding: 2px;
	margin: 2px;
	border: 1px solid gray;
	font-size: 16px;

	&:hover,
	&:focus {
		border-color: black;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
	}
`;

export function Input(
	props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
	const [length, setLength] = useState(String(props.value) ? String(props.value).length : 0);
	const changeValue = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setLength(() => (e.target as HTMLInputElement).value.length),
		[]
	);
	return (
		<StyledInput
			{...props}
			onInput={changeValue}
			style={{ width: ((length === 0 ? 1 : length) + 3) * getTextWidth(16, "monospace") }}
		/>
	);
}
