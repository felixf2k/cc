module.exports = handler;

async function handler(
    context,
    request,
) {
    try {
        const distance = (request.body && request.body.distance) || request.query.distance; 
        const fuelEfficiency =(request.body && request.body.fuelEfficiency) || request.query.fuelEfficiency ;
        const fuelPrice = (request.body && request.body.fuelPrice) || request.query.fuelPrice;
    
        context.log("values: ",distance, fuelEfficiency, fuelPrice);
        if(!distance || !fuelEfficiency || !fuelPrice) {
            context.res = {
                status: 400,
                body: `Missing required parameters (${!distance ? ' distance, ' : ''} ${!fuelEfficiency ? 'fuelEfficiency, ' : ''} ${!fuelPrice ? 'fuelPrice' : ''})`,
            };
            return;
        }
    
        const totalCost = calculateTripCost(Number.parseFloat(distance), Number.parseFloat(fuelEfficiency), Number.parseFloat(fuelPrice));
    
        context.res = { body: `Total trip price: ${totalCost}€`, status: 200 };
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
    const fuelNeeded = (distance / 100) * fuelEfficiency;
    const fuelCost = fuelNeeded * fuelPrice;
    const totalCost = fuelCost + otherExpenses;
    return totalCost;
}
