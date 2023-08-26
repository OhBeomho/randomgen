import { styled } from "styled-components";

export const Input = styled.input`
	all: unset;
	padding: 2px;
	margin: 2px;
	border: 2px solid gray;
	font-size: 16px;

	&:hover,
	&:focus {
		border-color: black;
	}
`;
