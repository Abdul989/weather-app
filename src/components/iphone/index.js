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
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b066944d877d9980a5e7667a70704f06";
		<Forecast
			{this.props.fetchHourlyWeather}
		
		/>
		$.ajax({
			url: url,
			//url1: url1,
			dataType: "jsonp",
			success : this.parseCurrentResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
			
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
	/*
	fetchHourlyWeather = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&mode=json&appid=b066944d877d9980a5e7667a70704f06";
		//http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&mode=json&appid=f4ac5d1f1ca1d23b2dff60f3a350e5c3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		this.setState({ display: false });

	}
	*/

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
				</div>
				
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div>
						<img src={iconLink} class={style.weatherIcons}></img>	
					</div>
					<div>
						{this.props.rows}
						<ul>	

							<li>{this.state.hourlyTemp}</li>
							<li>{this.state.hourCond}</li>
							<li>{this.state.weatherTime}</li>
						</ul>
						
					</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/> : null }
				</div>
				
			</div>
		);
	
	};
	/*iterate through 'list'
	e.g. for i=0 in list, i<5, i++
			arr[i] = list[i]
	store the hourlyTemp, hourCond and weatherTime in a list/array of size 5 (do this in the ajax bit so that everytime refreshes, updates)
	in the jsx part use the curly brackets to 

	gonna need repaeat many times so create more ul statements to dynamically iterate through, the parseHourlyResponse 
	or create a new component and in it loop the ul 5 times and then place the component tag in the jsx and will be auto styled 
	*/

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