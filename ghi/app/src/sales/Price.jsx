import React from 'react';

function Price({ price }) {
    const formattedPrice = Number(price).toLocaleString('en-US', {
        style: 'currency', currency: 'USD'
    });
    return <span>{formattedPrice}</span>;
}

export default Price;
