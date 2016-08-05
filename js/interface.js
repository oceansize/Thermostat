console.log("testing 1-2-3");
var thermostat = new Thermostat();

var updateTemperature = function() {
  $('#temperature').text(thermostat.temperature);
  updateEnergyUsageDisplay();
};

var toggleDisplay = function() {
  if(thermostat.powerSavingMode) {
    $('#power-saving-toggle').attr('class', thermostat.energyRating());
  } else {
    $('#power-saving-toggle').removeClass();
  };
};

var updateEnergyUsageDisplay = function() {
  $('body, #power-saving-divider').attr('class', thermostat.energyRating());
  toggleDisplay();
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
  $('#power-saving-toggle').on('click', function(event) {
    event.preventDefault();
    thermostat.togglePowerSavingMode();
    updateTemperature();
  });
  $('.PSM-on').on('click', function(event){
    event.preventDefault();
    thermostat.switchPowerSaveModeON();
    $(this).addClass(thermostat.energyRating());
    updateTemperature();
  })
  $('.PSM-off').on('click', function(event){
    event.preventDefault();
    thermostat.switchPowerSaveModeOFF();
    $(this).removeClass(thermostat.energyRating());
    updateTemperature();
  })

});
