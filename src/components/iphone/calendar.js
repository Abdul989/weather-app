// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';



export default class Calendar extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
        this.fetchForcastData()
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
        this.setState({AllWeatherData: ["Null"]});
        this.setState({fetchedWeather: false});
        this.setState({fetchedCalendar: false})
	}


	fetchForcastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=bbe1b2a0cfe9d01b8ff8ceae42cc6ca1";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseCalendarResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}


	// the main render method for the iphone component
	render() {
	

		
		// display all weather data
		return (
		
			<div class={ style.container }>		
            <h1>HElllo</h1>		
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
                            {this.state.fetchedWeather? this.calendarGrid():null}
        </div>
                </div>
                {/*<div>
                    {this.state.fetchedCalendar? this.dateGrid():null}
                </div>
                {//<div>{ this.dropdownDates() }</div>
                }
                {/*<div>
                    <select id = "dropdown">
                        <option value="N/A">N/A</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>*/}
                <div class={ style.conditions }>{ this.state.cond }</div>
                
                <span class={ style.tempStyles }>{ this.state.temp }</span>
                <div class={ style.details }></div> 
              	
            </div>
		);

	
	
	
	};
    /*dropdownDates = () => {
        for (let i = 0; i<5; i++){
            var stateNow = this.state.AllWeatherData[`${i}`]
            const weatherDay = (stateNow['dt_txt'].split(" ")[0])
            console.log(weatherDay)
            let dateGrid = []
            dateGrid.push(
                <div>
                    <select>
                        <option value={weatherDay}>Orange</option>
                        <option value={weatherDay}>Radish</option>
                        <option value={weatherDay}>Cherry</option>
                    </select>
                    <p>{message}</p>
                </div>
            )
        }
        return dateGrid;
    }
*/
	calendarGrid = () => {
        
        var listIcon = " "
		let calendarGrid = []
		for (let j = 0; j < 5; j++) {
			var stateNow = this.state.AllWeatherData[`${j}`]
			var condNow = (stateNow['weather']['0']['main'])
			var timeNow = (stateNow['dt_txt'].split(" ")[1]).split(":")
			var correctTimeNow = `${timeNow[0]}:${timeNow[1]}`
            var forecastDay = (stateNow['dt_txt'].split(" ")[0])//Make an input and set the date entered to this variable
            //console.log(forecastDay)
			if (condNow == "Clouds"){
				listIcon = "../../assets/icons/clouds.png"
			}else if(condNow == "Rain"){
				listIcon = "../../assets/icons/rainy.png"
			}else if(condNow == "Clear"){
				listIcon = "../../assets/icons/sun.png"
			}
            
			calendarGrid.push(

                <div class={ style.forecastList }>
                        <ul> 
                            <li>{ correctTimeNow }</li>
                            <li>
                                <img src={ listIcon } class={ style.forecastIcons }></img>
                            </li>
                            <li>{ stateNow['main']['temp'] }</li>
                        </ul>
                </div>
                
            )
		}
		return (
            calendarGrid,
            <select >
                        <option value="N/A">N/A</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
            </select>
        );
	}

	parseCalendarResponse = (parsed_json) => {
		var AllWeatherData = parsed_json['list'];

		this.setState({
			AllWeatherData: AllWeatherData,
            fetchedWeather: true,
            fetchedCalendar: true
		});  
	}

}