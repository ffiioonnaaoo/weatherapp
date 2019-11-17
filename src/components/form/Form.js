import React from 'react';
import './Form.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const GEO_API_KEY = process.env.REACT_APP_API_KEY_GEO;




//I would try and use functions instead of classes and the useState function to update the state
export default class Form extends React.Component{
constructor(props) {
  super(props)
  this.state = {
    city: '',
    country:'',
    error:'',
    isEmpty: false
  }
}
//checks if sth is typed into input field
onchange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    this.setState({isEmpty: false})
   // console.log(this.state)
}

//geo locate and look up co-ordinates
getLocation =  async(e)=> {
  e.preventDefault();

  if(!this.state.city && !this.state.country){
    this.setState({isEmpty: true})
    return
  }

  let city = this.state.city
  let country = this.state.country

  const geo_api_call = await fetch(`http://locationiq.com/v1/search.php?key=${GEO_API_KEY}&q=${city},${country}&format=json`)
  const data = await geo_api_call.json();

  if (data.error) {
    this.setState({error: "Enter a valid location"})
    return;
  }
  

  let latitude;
  let longitude;
  let cityName;

  if (data.length === 0){
    this.setState({error: "Enter a valid location"})
    
  }
  else if(data.length >= 1){
    latitude  = data[0].lat
    longitude  = data[0].lon
    cityName = data[0].display_name

  } else {
    latitude  = data.lat
    longitude  = data.lon
    cityName = data.display_name    
  } 

  console.log(data)
  console.log(cityName)


const weather_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)//make the api call
const weather_data = await weather_api_call.json();

this.props.history.push({
  pathname: '/weather',
  state: {
  data:weather_data,
  city:cityName
   
  }
});

//console.log(geo_api_call)

}
  render() {
    return (
      <div className="Form">
        <h1 className="form-title">Where on earth are you?</h1>
        <form>
            <div className = "input-container">
              <input type="text" id="city" name="city" placeholder="street/city/country" onChange={this.onchange}/>
            </div>           
              <button onClick={this.getLocation}>Get the weather</button>
        </form>
          <p>{this.state.error}</p>
          {this.state.isEmpty && <p>Please enter a location.</p>}
      </div>
    );
  }
}

  





