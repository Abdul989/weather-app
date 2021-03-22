// import preact
import { h, render, Component } from 'preact';
// import jquery for API calls
import $ from 'jquery';
import Iphone from '../iphone'


export default class Forecast extends Component {

    constructor(){
        super(props);
        this.fetchHourlyWeatherTwo;
    }

    fetchHourlyWeatherTwo = () => {
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=b066944d877d9980a5e7667a70704f06";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponseTwo,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

    }


    render(){
       
        return(
            <div>
                <table>
                    <tr>
                        <td>9 am</td>
                        <td>1 pm</td>
                        <td>5 pm</td>
                        <td>10 pm</td>
                    </tr>
                    <tr>
                        <td>{this.state.morning}</td>
                        <td>{this.state.dayTime}</td>
                        <td>{this.state.evening}</td>
                        <td>{this.state.nightime}</td>
                    </tr>
                </table>
            </div>
        );
    }




    parseHourlyResponseTwo = (parsed_json) => {
        var mor;
        var day;
        var eve;
        var night;
        mor = parsed_json['daily']['0']['temp']['morn'];
        day = parsed_json['daily']['0']['temp']['day'];
        eve = parsed_json['daily']['0']['temp']['eve'];
        night = parsed_json['daily']['0']['temp']['night'];


        this.setState({
            morning: mor,
            dayTime : day,
            evening : eve,
            nightime : night
        });

    }


}

