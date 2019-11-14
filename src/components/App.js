import React from "react";

import Search from "./Search";
import "../sass/style.scss";

function App() {

	return (
		<section className="styles">
			<h1>BOOK SEARCH ENGINE!</h1>
				<p>Find a wanted book,author or published date on
					<a href='https://books.google.pl/'> google books</a>
				</p>
					<p>Press "Search" button or "ENTER" to see search result</p>
				<Search/>
		</section>
	);
};

export default App;