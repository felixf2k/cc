
import {
    app,
    HttpRequest,
    HttpResponseInit,
} from '@azure/functions';

async function helloWorld1(
    request: HttpRequest,
): Promise<HttpResponseInit> {
    const distance = request.query.distance || request.body.distance;
    const fuelEfficiency =
        request.query.fuelEfficiency || request.body.fuelEfficiency;
    const fuelPrice = request.query.fuelPrice || request.body.fuelPrice;

    const totalCost = calculateTripCost(distance, fuelEfficiency, fuelPrice);

    return { body: totalCost };
}

app.http('helloWorld1', {
    methods: ['GET', 'POST'],
    handler: helloWorld1,
});

function calculateTripCost(
    distance: number,
    fuelEfficiency: number,
    fuelPrice: number,
    otherExpenses: number = 0,
): number {
    // Calculate the fuel needed
    const fuelNeeded = distance / fuelEfficiency;
    const fuelCost = fuelNeeded * fuelPrice;
    const totalCost = fuelCost + otherExpenses;
    return totalCost;
}
