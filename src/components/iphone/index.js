// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the Forecast component
import Forecast from '../forecast';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}
	//use the 48 hourly api because it gives all the info wee need as oppsed to using two api's, we can use this for the longer forecast aswell  because we can say its more accurate for the cyclist as the dataes get shorter and further less accurate 
	// a call to fetch weather data via wunderground 
	
	fetchWeatherData = () => {
		//this.fetchHourlyWeatherTwo();
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=f4ac5d1f1ca1d23b2dff60f3a350e5c3";
			
		$.ajax({
			url: url,
			//url1: url1,
			dataType: "jsonp",
			success : this.parseCurrentResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
			
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		this.fetchForcastData();
	}



	fetchForcastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=bbe1b2a0cfe9d01b8ff8ceae42cc6ca1";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForcastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		var hourly = this.state.hourlyTemp;
		var iconLink = " "; 
		if (this.state.main === "Clouds"){
			iconLink = "../../assets/icons/clouds.png";
		}
		else if(this.state.main === "Rain") {
			iconLink="../../assets/icons/rainy.png";
		}

		if (this.state.AllWeather != undefined) {

		// display all weather data
		return (
		
			<div class={ style.container }>				
				<div class={ style.header }>
					<nav>
						<div class = {style.leftGrid}>
							<a href="#">
								<img src="../../assets/icons/settings.png" class={style.settings}></img>
							</a>
						</div>
						<div class={ style.city,style.rightGrid } >
							<a href="#">
								{ this.state.locate }
							</a>
							<img src="../../assets/icons/location-icon.png" class={style.settings}></img>
						</div>
	
					</nav>
				<div class={style.forecastList}>
						{ this.createGrid() }
				</div>
				</div>
				<div class={ style.conditions }>{ this.state.cond }</div>
				<div>
					<img src={iconLink} class={style.weatherIcons}></img>	
				</div>
				<span class={ tempStyles }>{ this.state.temp }</span>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/> : null }
				</div>
			</div>
		);

	}
	else {
		return (
			<div class={ style.container }>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/> : null }
				</div>
			</div>
		);
	}
	
	};
	

	createGrid = () => {
		var listIcon = " "
		let grid = []
		for (let i = 0; i < 5; i++) {
			const currentState = this.state.AllWeather[`${i}`]
			const currentCond = (currentState['weather']['0']['main'])
			const time = (currentState['dt_txt'].split(" ")[1]).split(":")
			const correctTime = `${time[0]}:${time[1]}`

			if (currentCond == "Clouds"){
				listIcon = "../../assets/icons/clouds.png"
			}else if(currentCond == "Rain"){
				listIcon = "../../assets/icons/rainy.png"
			}else if(currentCond == "Clear"){
				listIcon = "../../assets/icons/sun.png"
			}

			grid.push(
				<div class={ style.forecastList }>
					<ul> 
						<li>{ correctTime }</li>
						<li>
							<img src={ listIcon } class={ style.forecastIcons }></img>
						</li>
						<li>{ currentState['main']['temp'] }</li>
					</ul>
				</div>
			);
		}
		return grid;
	}

	parseCurrentResponse = (parsed_json) => {

			var location = parsed_json['name'];
			var temp_c = parsed_json['main']['temp'];
			var conditions = parsed_json['weather']['0']['description'];
			var mainWeather = parsed_json['weather']['0']['main']
	
			// set states for fields so they could be rendered later on
			this.setState({
				locate: location,
				temp: temp_c,
				cond : conditions,
				main: mainWeather
			}
		
			);      
	}

	parseForcastResponse = (parsed_json) => {
		var AllWeather = parsed_json['list'];

		this.setState({
			AllWeather: AllWeather
		});      
	}

	/*parseHourlyResponseTwo = (parsed_json) => {
        var mor;
        var day;
        var eve;
        var night;
		var mainWeather
        mor = parsed_json['daily']['0']['temp']['morn'];
        day = parsed_json['daily']['0']['temp']['day'];
        eve = parsed_json['daily']['0']['temp']['eve'];
        night = parsed_json['daily']['0']['temp']['night'];
		mainWeather = parsed_json['daily']['0']['weather']['0']['main']

        this.setState({
            morning: mor,
            dayTime : day,
            evening : eve,
            nightime : night,
			mainWeat : mainWeather
        });

		console.log("hrllo")

    }*/

	/*
	
	parseHourlyResponse = (parsed_json) => {
		
		for (let i = 0; i<5; i++){
			console.log("looped "+i+" times")
			var tempHour = parsed_json['list'][i]['main']['temp'];
			var hourlyConditions = parsed_json['list'][i]['weather']['0']['main'];
			var time = parsed_json['list'][i]['dt_txt']
	
			// set states for fields so they could be rendered later on
			this.setState({
				hourlyTemp: tempHour,
				hourCond: hourlyConditions,
				weatherTime : time
			});      
		}
		
	
	}	
	*/
}