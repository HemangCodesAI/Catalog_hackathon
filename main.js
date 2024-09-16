function readInput() {

    try {
    
        const inputJson = require("./testcase2.json");
        return inputJson;
    
    } catch (error) {
    
        process.exit(1);
    
    }
}

function processInput(jsonInput) {
    
    try {
    
        const data = jsonInput;
        const points = [];

        const convertToBase10 = (value , base) => {return parseInt(value , base);};

        for (const key in data) {
            if (key !== 'keys') {

                const base = parseInt(data[key].base);
                const value = data[key].value;
                const valueBase10 = convertToBase10(value , base);

                points.push({ x: parseInt(key) , y: valueBase10 });

            }
        }

        return points;

    } catch (error) {

        console.error("Error processing the input JSON. Please ensure it's in the correct format.");
        process.exit(1);

    }
}

function interpolate(f , xi , n) {
    
    let result = 0;

    for (let i = 0 ; i < n ; i++) {
    
        let term = f[i].y;
        for (let j = 0 ; j < n ; j++) {if (j != i)term = term * (xi - f[j].x) / (f[i].x - f[j].x);}
        
        result += term;
    }

    return result;
}

const inputData = readInput();
const points = processInput(inputData);
const valueOfC = interpolate(points , 0 , points.length);

console.log(valueOfC);