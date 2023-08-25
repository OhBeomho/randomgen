import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Numbers from "./pages/Numbers";
import Strings from "./pages/Strings";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/nums" element={<Numbers />}></Route>
				<Route path="/strs" element={<Strings />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
