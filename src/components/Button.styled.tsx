import { Link } from "react-router-dom";
import { styled } from "styled-components";

const commonStyle = `
	padding: 5px;
	background-color: lightgray;

	&:hover {
		background-color: darkgray;
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
