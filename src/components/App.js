import React from "react";
import axios from "axios";
import weather from "../images/weather.jpg";
import "../sass/style.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		// source of location, degree, forecast, main
		this.state = { location: '', degree: '', forecast: [], main: '' }
	}

	temperatureConverterCelsius = (degree) => {
		return Math.round(degree * 5 / 9 + 32 / 10)
	}

	componentDidMount() {
		this.getLocation();
	}

	getLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.postSuccessLocation, this.postErrorLocation);
		}
	}
	// Get location coordinates
	postSuccessLocation= (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		// This API enables cross-origin requests to anywhere.
		const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c00cca645196f43959e6a78d0ae0bdaa&units=metric`;

		axios.get(url).then((res) => {
		const data = res.data;
		const temp = this.temperatureConverterCelsius(data.main.temp);
	
		this.setState({ location: `${data.name}, ${data.sys.country}`, degree: temp, main: data.weather[0].main })
		})
	}

	reloadLocation = () => {
		this.setState({ state: this.state });
	}

	postErrorLocation = (error) => {
		alert("UPS! I can't find your location");
	}

	render() {
		return (
			<div className="app">
				<section className="app-header">
					<img src={weather}  className="app-logo" alt="logo-image" />
					<p className="app-intro"> I found you in </p>
					<h2>{this.state.location} </h2>
					<button className="app-not" onClick={this.reloadLocation}>RELOAD</button>
				</section>
				<section className="app-weather">
					<h2 className="app-temp">{ this.state.degree }  C  <br/>
						<span className="app-condition">{ this.state.main } </span>
					</h2>
				</section>
			</div> 
		);
	}
}

export default App;