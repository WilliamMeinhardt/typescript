import * as fs from 'fs';

interface Result {
    sum: number;
    average: number;
    minimum: number;
    maximum: number;
    count: number;
}

function processNumbers(filename: string): Result {
    // Lese filen og splitte den i linjer
    const data: string = fs.readFileSync(filename, 'utf8');
    const lines: string[] = data.split('\n');
    
    // Konvertere hver linje til tall og fjerne tomme linjer
    const numbers: number[] = lines
        .filter(line => line.trim() !== '')
        .map(line => parseInt(line.trim(), 10));
    
    // Beregne resultater
    const totalSum: number = numbers.reduce((sum, num) => sum + num, 0);
    const average: number = totalSum / numbers.length;
    const minimum: number = Math.min(...numbers);
    const maximum: number = Math.max(...numbers);
    
    return {
        sum: totalSum,
        average: average,
        minimum: minimum,
        maximum: maximum,
        count: numbers.length
    };
}

function main(): void {
    // Start tidtaking
    const startTime: [number, number] = process.hrtime();
    
    // Hent filnavn fra kommandolinje eller bruk standard
    const filename: string = process.argv[2] || 'small.txt';
    
    try {
        // Behandle tallene
        const result: Result = processNumbers(filename);
        
        // Slutt tidtaking
        const endTime: [number, number] = process.hrtime(startTime);
        const executionTime: number = endTime[0] + endTime[1] / 1e9;
        
        // Skriv ut resultater
        console.log(`Fil: ${filename}`);
        console.log(`Antall tall: ${result.count}`);
        console.log(`Sum: ${result.sum}`);
        console.log(`Gjennomsnitt: ${result.average}`);
        console.log(`Minste verdi: ${result.minimum}`);
        console.log(`Største verdi: ${result.maximum}`);
        console.log(`Kjøretid: ${executionTime.toFixed(6)} sekunder`);
        
        // Estimert minnebruk
        const memoryUsage = process.memoryUsage();
        console.log(`Minnebruk: ${memoryUsage.rss / 1024 / 1024} MB`);
    } catch (error) {
        console.error('Feil ved prosessering av filen:', error);
    }
}

main();