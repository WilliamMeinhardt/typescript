"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function processNumbers(filename) {
    // Lese filen og splitte den i linjer
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split('\n');
    // Konvertere hver linje til tall og fjerne tomme linjer
    var numbers = lines
        .filter(function (line) { return line.trim() !== ''; })
        .map(function (line) { return parseInt(line.trim(), 10); });
    // Beregne resultater
    var totalSum = numbers.reduce(function (sum, num) { return sum + num; }, 0);
    var average = totalSum / numbers.length;
    var minimum = Math.min.apply(Math, numbers);
    var maximum = Math.max.apply(Math, numbers);
    return {
        sum: totalSum,
        average: average,
        minimum: minimum,
        maximum: maximum,
        count: numbers.length
    };
}
function main() {
    // Start tidtaking
    var startTime = process.hrtime();
    // Hent filnavn fra kommandolinje eller bruk standard
    var filename = process.argv[2] || 'small.txt';
    try {
        // Behandle tallene
        var result = processNumbers(filename);
        // Slutt tidtaking
        var endTime = process.hrtime(startTime);
        var executionTime = endTime[0] + endTime[1] / 1e9;
        // Skriv ut resultater
        console.log("Fil: ".concat(filename));
        console.log("Antall tall: ".concat(result.count));
        console.log("Sum: ".concat(result.sum));
        console.log("Gjennomsnitt: ".concat(result.average));
        console.log("Minste verdi: ".concat(result.minimum));
        console.log("St\u00F8rste verdi: ".concat(result.maximum));
        console.log("Kj\u00F8retid: ".concat(executionTime.toFixed(6), " sekunder"));
        // Estimert minnebruk
        var memoryUsage = process.memoryUsage();
        console.log("Minnebruk: ".concat(memoryUsage.rss / 1024 / 1024, " MB"));
    }
    catch (error) {
        console.error('Feil ved prosessering av filen:', error);
    }
}
main();
