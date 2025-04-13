// categories.js
const conversionOptions = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        gram: 1,
        kilogram: 0.001,
        pound: 0.00220462,
        ounce: 0.035274,
        ton: 0.000001
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        cup: 4.22675,
        pint: 2.11338
    },
    temperature: {
        celsius: (val) => val,
        fahrenheit: (val) => (val - 32) * 5 / 9,
        kelvin: (val) => val - 273.15
    },
    area: {
        squareMeter: 1,
        squareKilometer: 0.000001,
        hectare: 0.0001,
        acre: 0.000247105,
        squareFoot: 10.7639,
        squareYard: 1.19599
    },
    speed: {
        meterPerSecond: 1,
        kilometerPerHour: 3.6,
        milePerHour: 2.23694,
        feetPerSecond: 3.28084
    }
};

// Conversion function to convert between units
function convertValue(value, inputUnit, outputUnit) {
    const category = getCategory(inputUnit); // Determine category from unit
    let baseValue;

    // For temperature conversion
    if (category === 'temperature') {
        baseValue = conversionOptions.temperature[inputUnit](value); // Convert to Celsius
        return convertTemperature(baseValue, outputUnit); // Convert from Celsius to the desired unit
    }

    // Convert input value to base
    baseValue = value / conversionOptions[category][inputUnit];

    // Convert base value to output unit
    return baseValue * conversionOptions[category][outputUnit];
}

// Get category based on the input unit
function getCategory(unit) {
    for (const category in conversionOptions) {
        if (conversionOptions[category][unit]) {
            return category;
        }
    }
    return null;
}

// Handle temperature conversion
function convertTemperature(value, outputUnit) {
    if (outputUnit === 'celsius') {
        return value; // Already in Celsius
    } else if (outputUnit === 'fahrenheit') {
        return (value * 9 / 5) + 32; // Convert to Fahrenheit
    } else if (outputUnit === 'kelvin') {
        return value + 273.15; // Convert to Kelvin
    }
}

// Update the conversion options
function updateConversionOptions(category) {
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');

    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    for (const unit in conversionOptions[category]) {
        inputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }

    // Call updateConversion to perform the initial conversion
    updateConversion();
}
