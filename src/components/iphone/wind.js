// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';
import Calendar from './calendar';



export default class Wind extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
        this.fetchForcastData()
        this.state = {
            selectValue: 0
          };
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
        this.setState({AllWeatherData: ["Null"]});
        this.setState({fetchedWeather: false});
        this.setState({fetchedCalendar: false});
        this.setState({Home: false})
        this.setState({calendar: false})
        this.setState({map: false})


        this.handleDropdownChange = this.handleDropdownChange.bind(this);

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
            <div class={ style.header }>
					<nav>
                    <table class = {style.leftGrid}>
								<tr>
									
									<td class={style.setting} ><a href="#"><img src="../../assets/icons/settings.png" class={style.settings}></img></a></td>
									
									<td class={style.location}><a id={style.location} href="#" >{ this.state.location }</a></td>

									<td><img src="../../assets/icons/location-icon.png" class={style.settings}></img></td>
								</tr>
							</table>
                        </nav>
                        <div class={style.title}>Wind Direction</div>
                </div>
                <div class={ style.conditions }>{ this.state.cond }</div>
                <br></br>
                <span class={ style.tempStyles }>{ this.state.temp }</span>
                <div class={ style.details }>
                    
                    </div> 

                    <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton} src="../../assets/icons/home.png"/></button></div>
					<div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.homebutton} src="../../assets/icons/wind.png"/></button></div>
					<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
              	
                </div>
		);
            }else if(this.state.calender){
                return(<div><Calendar/></div>);
            }
            else if(this.state.map){
                return(<div><Map/></div>);
            }
            else{
                return(<div><Iphone/></div>);
            }
	
        }
        
        
        handleDropdownChange(e) {
            this.setState({ selectValue: e.target.value });
        }
          
        showHome = () => {
            this.setState({Home: true})
    
        }
        showMap = () => {
            this.setState({map: true})
            this.setState({Home: false})
        }
        showCalendar = () => {
            this.setState({calendar: true})
            this.setState({Home: false})
        }



        parseCalendarResponse = (parsed_json) => {
            var AllWeatherData = parsed_json['list'];
            var locate = parsed_json['city']['name'];
            console.log(locate)
            this.setState({
                location: locate,
                AllWeatherData: AllWeatherData,
                fetchedWeather: true,
                fetchedCalendar: true
            });  
        }



}