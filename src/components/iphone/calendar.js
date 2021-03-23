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
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
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
                    {/*<div class={style.forecastList}>
                            { this.createGrid() }
                        </div>*/}
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
    dropdownDates = () => {
        for (let i = 0; i<5; i++){
            const weatherDay = (currentState['dt_txt'].split(" ")[0])
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

	parseForcastResponse = (parsed_json) => {
		var AllWeather = parsed_json['list'];

		this.setState({
			AllWeather: AllWeather
		});      
	}

}