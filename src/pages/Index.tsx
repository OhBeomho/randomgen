import { LinkButton } from "../components/Button.styled";
import Layout from "../components/Layout";

export default function () {
	return (
		<Layout>
			<h1>RandomGen</h1>
			<p>
				<LinkButton to="/nums">무작위 수 생성</LinkButton>
				&nbsp;&nbsp;
				<LinkButton to="/strs">무작위 문자열 생성</LinkButton>
			</p>
		</Layout>
	);
}
