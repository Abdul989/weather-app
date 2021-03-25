// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';



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
        this.setState({fetchedCalendar: false});
        this.setState({Home: false})
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
	
        if(this.state.Home==false){
		
		// display all weather data
		return (
		
			<div class={ style.container }>		
            <h1>Calender</h1>		
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
            */}
                <div>
                    <select id = "dropdown">
                        <option value="N/A">Choose day</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    {this.state.fetchedWeather?  this.weekdays(): null }</div>
                <div class={ style.conditions }>{ this.state.cond }</div>
                
                <span class={ style.tempStyles }>{ this.state.temp }</span>
                <div class={ style.details }>
                    </div> 

                    <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton} src="../../assets/icons/home.png"/></button></div>
					<div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.homebutton} src="../../assets/icons/wind.png"/></button></div>
					<div><button class={ style.map} onClick={this.showCalendar} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
              	
            </div>
		);
            }
            else{
                return(<div><Iphone/></div>);
            }
	
	
	
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
        let weekDay = []
		for (let j = 0; j < 5; j++) {
			var stateNow = this.state.AllWeatherData[`${j}`]
			var condNow = (stateNow['weather']['0']['main'])
			var timeNow = (stateNow['dt_txt'].split(" ")[1]).split(":")
			var correctTimeNow = `${timeNow[0]}:${timeNow[1]}`
            var forecastDay = (stateNow['dt_txt'].split(" ")[0])//Make an input and set the date entered to this variable
            //console.log(forecastDay)
            weekDay.push(forecastDay);
			if (condNow == "Clouds"){
				listIcon = "../../assets/icons/clouds.png"
			}else if(condNow == "Rain"){
				listIcon = "../../assets/icons/rainy.png"
			}else if(condNow == "Clear"){
				listIcon = "../../assets/icons/sun.png"
			}
            
			calendarGrid.push(

                <div class={ style.forecastList }>
                        <table> 
                            <tr><th>{ correctTimeNow }</th></tr>
                            <tr>
                            <td>
                                <img src={ listIcon } class={ style.forecastIcons }></img>
                            </td>
                            </tr>
                            <tr>
                            <td>{ Math.round(stateNow['main']['temp']) }</td>
                            </tr>
                        </table>
                </div>
                
                
                )

		}
		return (
            calendarGrid
        );
	}
    weekdays = () => {
        let weekDay = []
        var j;
        for ( j = 0; j < 33; j+=8) {
            var stateNow = this.state.AllWeatherData[j]
            var forecastDay = stateNow['dt_txt']//Make an input and set the date entered to this variable
            console.log(weekDay);
            console.log(stateNow);
            console.log(forecastDay);
            console.log(j);
            weekDay.push(forecastDay);
    
            }
        return (weekDay);
    }
    showHome = () => {
		this.setState({Home: true})

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