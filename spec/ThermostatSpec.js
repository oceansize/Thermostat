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
    it("has a minimum temperature", function() {
      expect(thermostat.MINIMUM_TEMPERATURE).toEqual(10);
    });
  });

  describe("temperature", function() {
    it("can be increased", function() {
      thermostat.increaseTemperature(degreesToChangeBy);
      expect(thermostat.temperature).toEqual(21);
    });
    it("can be decreased", function() {
      thermostat.decreaseTemperature(degreesToChangeBy);
      expect(thermostat.temperature).toEqual(19);
    });
    it("cannot go below minimum temperature", function() {
      thermostat.temperature = 10;
      thermostat.decreaseTemperature(2000);
      expect(thermostat.temperature).toEqual(10);
    });
    it("cannot go above maximum temperature", function() {
      thermostat.increaseTemperature(2000);
      expect(thermostat.temperature).toEqual(25);
    });
    it("can be reset", function() {
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(defaultTemperature);
    });
  });

  describe("has a power-saving mode (PSM)", function() {
    it("which is on by default", function() {
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it("can be switched OFF", function() {
      thermostat.switchPowerSaveModeOFF();
      expect(thermostat.powerSavingMode).toBe(false);
    });
    it("can be switched from OFF to ON", function() {
      thermostat.switchPowerSaveModeOFF();
      thermostat.switchPowerSaveModeON();
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it('can be toggled on and off', function() {
      expect(thermostat.powerSavingMode).toBe(true);
      thermostat.togglePowerSavingMode();
      expect(thermostat.powerSavingMode).toBe(false);
      thermostat.togglePowerSavingMode();
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it("decides maximum temperature when on and off", function() {
      expect(thermostat.MAXIMUM_TEMPERATURE).toEqual(25);
      thermostat.switchPowerSaveModeOFF();
      expect(thermostat.MAXIMUM_TEMPERATURE).toEqual(32);
    });

    describe("when switched on", function() {
      it("if temperature is set above maximum, reduce to limit", function() {
        thermostat.switchPowerSaveModeOFF();
        thermostat.increaseTemperature(2000);
        thermostat.switchPowerSaveModeON();
        expect(thermostat.temperature).toEqual(25);
      });
      it("if temperature is below limit, remains unchanged", function() {
        thermostat.switchPowerSaveModeOFF();
        thermostat.switchPowerSaveModeON();
        expect(thermostat.temperature).toEqual(20);
      });
    });
  });

  describe("reflects energy usage with a rating", function() {
    it("less than 18 degrees is considered low usage", function() {
      thermostat.decreaseTemperature(3);
      expect(thermostat.energyRating()).toEqual("low-usage")
    });
    it("less than 25 degrees is considered medium usage", function() {
      expect(thermostat.energyRating()).toEqual("medium-usage")
    });
    it("25 or above is considered high usage", function() {
      thermostat.increaseTemperature(5);
      expect(thermostat.energyRating()).toEqual("high-usage")
    });
  });
});
