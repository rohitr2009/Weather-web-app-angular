import { Component, Output, EventEmitter } from '@angular/core'
import { WeatherDataService } from '../../services/weather-data.service'
import { Weather } from '../../app.component'

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {
  @Output() onSelection: EventEmitter<Weather> = new EventEmitter<Weather>()
  weather: Weather = new Weather()
  city: String = ""

  constructor(private weatherData: WeatherDataService) { }

  submit() {
    this.weatherData.load(this.city).subscribe(data => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      this.weather.city = data['name']
      this.weather.conditions = data['weather'][0]['main']
      this.weather.temperature = Math.round((data['main']['temp'] - 273.15)*1.8 + 32)
      this.weather.icon = this.weatherData.getIconUrl(data['weather'][0]['icon'])
      this.weather.isWarm = this.weather.temperature > 60 ? true : false
      this.weather.country = data['sys']['country']
      this.weather.day = days[new Date().getDay()] + " " +
       new Date().getDate() + " " +
       months[new Date().getMonth()] + " " + 
        new Date().getFullYear()
      this.onSelection.emit(this.weather)
    })
  }
}
