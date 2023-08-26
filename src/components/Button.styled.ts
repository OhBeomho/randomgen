import { Link } from "react-router-dom";
import { styled } from "styled-components";

const commonStyle = `
	padding: 5px;
	background-color: lightgray;

	&:hover {
		background-color: darkgray;
		border-color: black;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
	}
`;

export const LinkButton = styled(Link)`
	${commonStyle}
	color: black;

	&:hover {
		text-decoration: none;
	}
`;

export const Button = styled.button`
	all: unset;
	${commonStyle}
`;
