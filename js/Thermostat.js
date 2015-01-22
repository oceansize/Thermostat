"use strict";

var Thermostat = function () {
  this.powerSavingMode = true;
  this.powerSaveOffLimit = 32;
  this.powerSaveOnLimit = 25;
  this.energyUsageBreakpoint = 18;
  this.defaultTemperature = 20;
  this.minimumTemperature = 10;
  this.maximumTemperature = this.powerSaveOnLimit;
  this.temperature = this.defaultTemperature;
  this.defaultTemperatureChange = 1;
};

Thermostat.prototype.increaseTemperature = function(degreesToChangeBy) {
  degreesToChangeBy = degreesToChangeBy || this.defaultTemperatureChange;
  if (this.temperature + degreesToChangeBy > this.maximumTemperature) {
    this.temperature = this.maximumTemperature;
  }
  else {
    this.temperature += degreesToChangeBy;
  }
};

Thermostat.prototype.decreaseTemperature = function(degreesToChangeBy) {
  degreesToChangeBy = degreesToChangeBy || this.defaultTemperatureChange;
  if (this.temperature - degreesToChangeBy < this.minimumTemperature) {
    this.temperature = this.minimumTemperature;
  }
  else {
    this.temperature -= degreesToChangeBy;
  }
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.defaultTemperature;
};

Thermostat.prototype.switchPowerSaveModeOFF =   function() {
  this.powerSavingMode = false;
  this.maximumTemperature = this.powerSaveOffLimit;
};

Thermostat.prototype.switchPowerSaveModeON =   function() {
  this.powerSavingMode = true;
  this.maximumTemperature = this.powerSaveOnLimit;
  if(this.temperature > this.powerSaveOnLimit) this.temperature = this.powerSaveOnLimit;
};

Thermostat.prototype.energyRating = function() {
  if(this.temperature < this.energyUsageBreakpoint) {
    return "low-usage";
  }
  else if(this.temperature < this.powerSaveOnLimit && this.temperature >= this.energyUsageBreakpoint) {
    return "medium-usage";
  }
  else {
    return "high-usage";
  }
};
