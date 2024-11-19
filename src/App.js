import React from 'react';
import BillDetails from './component/billdetails'; 
import ItemList from './component/itemslist'; 
import TotalAmount from './component/totalamount'; 
import { jsPDF } from 'jspdf'; 
import './App.css';


function App() {

  //state management . the items is an array that stores the list of items added to the bill, setItems is a function to update the items array.
  const [items, setItems] = React.useState([])// initial value is an empty list.

  //Adding an item.
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };// Input (item): A new item object with properties like item, quantity, and price. The action setItems adds the new item to the existing items array using the spread operator (...items).

  //Deleting an item.
  const handleDeleteItem = (index) => {//index is the position of the item to delete.
    const updatedItems = [...items] //Makes a copy of the items array.
    updatedItems.splice(index, 1) //Removes the item at the specified index using splice.
    setItems(updatedItems) //Updates the state with the modified list.
  }

  //Calculating Total Amount
  const calculateTotalAmount = () => {
    return items.reduce( //the reduce function iterates through each item in the items array.
      (total, item) =>
        total + item.quantity * item.price, 0 // (0)means the initial total will start from zero.
    )
  }

  //Downloading the Invoice as PDF.

  const handleDownloadPDF = () => {
    const pdf = new jsPDF() //Initializes a new jsPDF instance.
    pdf.text('invoice', 20, 20) //Adds the title "Invoice" at coordinates (20, 20).

    items.forEach((item, index) => {
      const yPos = 30 + index * 10
      pdf.text(
        `Item: ${item.item},
         Quantity: ${item.quantity}, 
         Price: ${item.price}`, 20, yPos);

    }) //  Loops through items, adding each to the PDF at dynamic vertical positions (yPos).

    const TotalAmount = calculateTotalAmount() //Appends the total amount, calculated using calculateTotalAmount.
    pdf.text(
      `Total Amount:
      $${TotalAmount.toFixed(2)}`, 20, 180
    )

    pdf.save('invoice.pdf') // Saves the file as invoice.pdf.

  }

  return (
    <div className="App">
      <h1>Bill/Invoice Generator</h1>
      <BillDetails onAddItem={handleAddItem} />
      <ItemList
        items={items}
        onDeleteItem={handleDeleteItem} />
      <TotalAmount
        total={calculateTotalAmount()} />
      <button
        onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );

}




export default App;
