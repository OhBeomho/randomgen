import { styled } from "styled-components";

export const Settings = styled.div<{ $rows: number; $columns: number }>`
	display: grid;
	grid-template-rows: repeat(${(props) => props.$rows}, auto);
	grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
	text-align: center;
	padding: 10px;
	gap: 5px;

	& > * {
		min-width: max-content;
	}
`;
