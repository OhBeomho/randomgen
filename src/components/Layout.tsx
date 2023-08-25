import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Navbar = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

	& a.brand {
		font-size: 25px;
		color: black;
	}

	& .links {
		display: flex;
		gap: 10px;
	}
`;

const Main = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Footer = styled.footer`
	text-align: center;
	padding: 10px;
	background-color: lightgray;
	color: gray;
`;

export default function ({ children }: PropsWithChildren) {
	return (
		<Wrapper>
			<header>
				<Navbar>
					<Link to="/" className="brand">
						RandomGen
					</Link>
					<div className="links">
						<Link to="/nums">무작위 수</Link>
						<Link to="/strs">무작위 문자열</Link>
					</div>
				</Navbar>
			</header>
			<Main>{children}</Main>
			<Footer>
				Source on <a href="https://github.com/OhBeomho/randomgen">Github</a>
			</Footer>
		</Wrapper>
	);
}
