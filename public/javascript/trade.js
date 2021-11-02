// this is the front end javascript file to handle the buying and selling of stocks
const tradeForm = document.querySelector('.trade-form');

async function tradeFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('#type').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const symbol = document.querySelector('#symbol').textContent.trim();
    const price = document.querySelector('#price').textContent.trim();

    const cost = parseInt(quantity) * parseFloat(price);

    // making sure that the quantity is greater than 0
    if(type && quantity > 0){
        const response = await fetch('/api/holdings/', {
            method: 'post',
            body: JSON.stringify({
                symbol,
                quantity,
                type,
                cost
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            // fix this, not displaying the proper error message
            // case: not enough money, all cases
            alert(response.statusText);
        }
    }
}

tradeForm.addEventListener('submit', tradeFormHandler);