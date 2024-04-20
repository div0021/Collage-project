export function extractNumericValues(rangeString:string):{minValue:number,maxValue:number} {
    // Remove non-numeric characters except for digits, commas, and hyphens
    const numericString = rangeString.replace(/[^\d,-]/g, '');

    // Split the numeric string by hyphens to get the minimum and maximum values
    const values = numericString.split('-');

    // Parse the values into integers (remove commas and convert to numbers)
    const minValue = parseInt(values[0].replace(/,/g, ''), 10);
    const maxValue = parseInt(values[1].replace(/,/g, ''), 10);

    // Return an object containing the extracted numerical values and comparison operator
    return { minValue, maxValue };
}