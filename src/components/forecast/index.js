// import preact
import { h, render, Component } from 'preact';
// import jquery for API calls
import $ from 'jquery';
import Iphone from '../iphone'


export default class Forecast extends Component {


    fetchHourlyWeather = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&mode=json&appid=b066944d877d9980a5e7667a70704f06";
		//http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&mode=json&appid=f4ac5d1f1ca1d23b2dff60f3a350e5c3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

    
    //return <tbody>{rows}</tbody>;
	}

    render(){
        <Iphone 
            weatherData = {this.fetchHourlyWeather} 
        />
        
        var rows = [];
		for (var i = 0; i < 5; i++) {
			// note: we are adding a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			rows.push(<Iphone key={i} />);
		}
		
        return(
                    <div>
						<ul>	

							<li>{this.state.hourlyTemp}</li>
							<li>{this.state.hourCond}</li>
							<li>{this.state.weatherTime}</li>
						</ul>
                    </div>
        );
    }


    parseHourlyResponse = (parsed_json) => {

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

