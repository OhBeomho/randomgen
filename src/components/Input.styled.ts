import { styled } from "styled-components";

export const Input = styled.input`
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
