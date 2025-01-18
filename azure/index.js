module.exports = handler;

async function handler(
    context,
    request,
) {
    try {
        const distance = request.query.distance || (request.body && request.body.distance);
        const fuelEfficiency =
            request.query.fuelEfficiency || (request.body && request.body.fuelEfficiency);
        const fuelPrice = request.query.fuelPrice || (request.body && request.body.fuelPrice);
    
        if(!distance || !fuelEfficiency || !fuelPrice) {
            context.res = {
                status: 400,
                body: `Missing required parameters (${!distance ? ' distance, ' : ''} ${!fuelEfficiency ? 'fuelEfficiency, ' : ''} ${!fuelPrice ? 'fuelPrice' : ''})`,
            }
        }
    
        const totalCost = calculateTripCost(Number.parseFloat(distance), Number.parseFloat(fuelEfficiency), Number.parseFloat(fuelPrice));
    
        context.res = { body: totalCost, status: 200 };
    } catch (error) {
        context.log(error);
        context.res = {
            body: "Internal Server Error",
            status: 500,
        }
    }

}

function calculateTripCost(
    distance,
    fuelEfficiency,
    fuelPrice,
    otherExpenses = 0,
) {
    // Calculate the fuel needed
    const fuelNeeded = distance / fuelEfficiency;
    const fuelCost = fuelNeeded * fuelPrice;
    const totalCost = fuelCost + otherExpenses;
    return totalCost;
}
