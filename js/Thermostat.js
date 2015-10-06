"use strict";

var Thermostat = function () {
  this.powerSavingMode = true;
  this.POWER_SAVE_OFF_LIMIT = 32;
  this.POWER_SAVE_ON_LIMIT = 25;
  this.ENERGY_USAGE_BREAKPOINT = 18;
  this.DEFAULT_TEMPERATURE = 20;
  this.MINIMUM_TEMPERATURE = 10;
  this.MAXIMUM_TEMPERATURE = this.POWER_SAVE_ON_LIMIT;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.DEFAULT_TEMPERATURE_CHANGE = 1;
};

Thermostat.prototype.increaseTemperature = function(degreesToChangeBy) {
  degreesToChangeBy = degreesToChangeBy || this.DEFAULT_TEMPERATURE_CHANGE;
  if (this.temperature + degreesToChangeBy > this.MAXIMUM_TEMPERATURE) {
    this.temperature = this.MAXIMUM_TEMPERATURE;
  }
  else {
    this.temperature += degreesToChangeBy;
  }
};

Thermostat.prototype.decreaseTemperature = function(degreesToChangeBy) {
  degreesToChangeBy = degreesToChangeBy || this.DEFAULT_TEMPERATURE_CHANGE;
  if (this.temperature - degreesToChangeBy < this.MINIMUM_TEMPERATURE) {
    this.temperature = this.MINIMUM_TEMPERATURE;
  }
  else {
    this.temperature -= degreesToChangeBy;
  }
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.switchPowerSaveModeOFF =   function() {
  this.powerSavingMode = false;
  this.MAXIMUM_TEMPERATURE = this.POWER_SAVE_OFF_LIMIT;
};

Thermostat.prototype.switchPowerSaveModeON =   function() {
  this.powerSavingMode = true;
  this.MAXIMUM_TEMPERATURE = this.POWER_SAVE_ON_LIMIT;
  if(this.temperature > this.POWER_SAVE_ON_LIMIT) this.temperature = this.POWER_SAVE_ON_LIMIT;
};

Thermostat.prototype.energyRating = function() {
  if(this.temperature < this.ENERGY_USAGE_BREAKPOINT) {
    return "low-usage";
  }
  else if(this.temperature < this.POWER_SAVE_ON_LIMIT && this.temperature >= this.ENERGY_USAGE_BREAKPOINT) {
    return "medium-usage";
  }
  else {
    return "high-usage";
  }
};
