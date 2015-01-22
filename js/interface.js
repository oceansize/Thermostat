console.log("testing 1-2-3");
var thermostat = new Thermostat();

var updateTemperature = function (){
  $('#temperature').text(thermostat.temperature);
  $('body, #power-saving-divider').attr('class', thermostat.energyRating());
};

$(document).ready(function() {
  updateTemperature();

  $('.increaseTemp').on('click', function(event) {
    event.preventDefault();
    thermostat.increaseTemperature();
    updateTemperature();
  });
  $('.decreaseTemp').on('click', function(event) {
    event.preventDefault();
    thermostat.decreaseTemperature();
    updateTemperature();
  });
  $('.reset').on('click', function(event) {
    event.preventDefault();
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('.PSM-on').on('click', function(event){
    event.preventDefault();
    thermostat.switchPowerSaveModeON();
    $(this).addClass();
    updateTemperature();
  })

  $('.PSM-off').on('click', function(event){
    event.preventDefault();
    thermostat.switchPowerSaveModeOFF();
    $(this).removeClass(thermostat.energyRating());
    updateTemperature();
  })

});
