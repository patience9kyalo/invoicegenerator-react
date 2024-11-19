import React, { useState } from 'react';

// onAddItem: A function to handle adding a new item to the bill.
const BillDetails = ({ onAddItem }) => {

    const [item, setItem] = useState('') // Initializes a state variable item with an empty string as its initial value.
    // setItem is a function used to update item.

    const [quantity, setQuantity] = useState(1) // Initializes a state variable quantity with a default value of 1.

    const [price, setPrice] = useState(0) // Initializes a state variable price with a default value of 0.

    const [errorMessage, setErrorMessage] = useState('') //Initializes a state variable errorMessage with an empty string, used to display validation errors to the user.

    const handleAddItem = () => { //Defines a function that will be called when the add item button is clicked.
        if (!item.trim()) {
            setErrorMessage(`Please input data in the Item section.`);
            return;
        } // Checks if the item input is empty or contains only whitespace.
        // If true, sets an error message and stops the function execution using return.

        if (!/^[a-zA-Z]+$/.test(item)) {
            setErrorMessage(`Item should only contain alphabetical characters.`);
            return;
        } // Validates the item input to ensure it only contains alphabetical characters using a regular expression.
        // If the validation fails, sets an error message and stops execution.  

        const newItem = { item, quantity, price } // Creates a new object newItem with the current values of item, quantity, and price.

        onAddItem(newItem) //Calls the onAddItem function (passed as a prop) with the new item data.
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('') //Resets the form inputs and clears the error message after successfully adding the item.

    }


    return (
        <div>
            <label>Item:</label>
            <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
            />
            <label>Quantity:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Price:</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleAddItem}>Add Item</button>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>

    )
}

export default BillDetails


