// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';

export default class Wind extends Component{

    constructor(props){
        super(props)
        this.setState({Home: false})
    }

    render(){

        if (this.state.home == false)
        return(

        )
    }
}