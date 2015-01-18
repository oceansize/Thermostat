describe("Thermostat", function() {
  var thermostat;
  var degreesToChangeBy;
  var defaultTemperature;

  beforeEach(function() {
    thermostat = new Thermostat();
    degreesToChangeBy = 1;
    defaultTemperature = 20;
  });

  describe("by default", function() {
    it("starts at 20 degrees", function() {
      expect(thermostat.temperature).toEqual(defaultTemperature);
    });
    it("must have a minimum temperature", function() {
      expect(thermostat.minimumTemperature).toEqual(10);
    });
  });

  describe("changing temperature", function() {
    it("temperature can be increased", function() {
      thermostat.increaseTemperature(degreesToChangeBy);
      expect(thermostat.temperature).toEqual(21);
    });
    it("temperature can be decreased", function() {
      thermostat.decreaseTemperature(degreesToChangeBy);
      expect(thermostat.temperature).toEqual(19);
    });
    it("temperature cannot go below minimum temperature", function() {
      thermostat.temperature = 10
      thermostat.decreaseTemperature(2000);
      expect(thermostat.temperature).toEqual(10)
    });
    it("temperature cannot go above maximum temperature", function() {
      thermostat.increaseTemperature(2000);
      expect(thermostat.temperature).toEqual(25);
    });
    it("temperature can be reset", function() {
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(defaultTemperature);
    });
  });

  describe("has a power-saving mode (PSM)", function() {
    it("PSM is off by default", function() {
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it("PSM can be switched OFF", function() {
      thermostat.switchPowerSaveModeOFF();
      expect(thermostat.powerSavingMode).toBe(false);
    });
    it("PSM can be switched from OFF to ON", function() {
      thermostat.switchPowerSaveModeOFF();
      thermostat.switchPowerSaveModeON();
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it("PSM decides maximum temperature", function() {
      expect(thermostat.maximumTemperature).toEqual(25);
      thermostat.switchPowerSaveModeOFF();
      expect(thermostat.maximumTemperature).toEqual(32);
    });
  });

  describe("reflects energy usage with a rating", function() {
    it("Less than 18 degrees is considered low usage", function() {
      thermostat.decreaseTemperature(5);
      expect(thermostat.energyRating()).toEqual("low")
    });
    it("Less than 25 degrees is considered medium usage", function() {
      expect(thermostat.energyRating()).toEqual("medium")
    });
    it("25 or above is considered high usage", function() {
      thermostat.increaseTemperature(5);
      expect(thermostat.energyRating()).toEqual("high")
    });
  });
});
