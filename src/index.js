import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import EmpDataProvider from "./context/EmpDataContext";

ReactDOM.render(
	<BrowserRouter>
		<EmpDataProvider>
			<App />
		</EmpDataProvider>
	</BrowserRouter>
	,document.getElementById( "root" )
);
