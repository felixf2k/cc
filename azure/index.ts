import {
    app,
    HttpRequest,
    HttpResponseInit,
} from '@azure/functions';

async function handler(
    request: HttpRequest,
): Promise<HttpResponseInit> {
    try {
        const distance: string = request.query.distance || request.body.distance;
        const fuelEfficiency: string =
            request.query.fuelEfficiency || request.body.fuelEfficiency;
        const fuelPrice: string = request.query.fuelPrice || request.body.fuelPrice;
    
        if(!distance || !fuelEfficiency || !fuelPrice) {
            return {
                status: 400,
                body: `Missing required parameters (${!distance ? ' distance, ' : ''} ${!fuelEfficiency ? 'fuelEfficiency, ' : ''} ${!fuelPrice ? 'fuelPrice' : ''})`,
            }
        }
    
        const totalCost = calculateTripCost(Number.parseFloat(distance), Number.parseFloat(fuelEfficiency), Number.parseFloat(fuelPrice));
    
        return { body: totalCost, status: 200 };
    } catch (error) {
        context.log(error);
        return {
            body: "Internal Server Error",
            status: 500,
        }
    }

}

app.http('tripCost', {
    methods: ['GET'],
    handler,
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
