import React, { useState, useEffect } from 'react';
import './InventoryManagement.css'

function InventoryManagement() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://ec2-18-221-130-93.us-east-2.compute.amazonaws.com:3001/api/inventory');
    const data = await response.json();
    setInventoryItems(data);
  };

  const handleCreateItem = async () => {
    if (!itemName || !itemQuantity || !itemImage) {
      alert('Name and quantity fields cannot be empty.');
      return;
    }

    const newItem = {
      name: itemName,
      quantity: Number(itemQuantity),
      image: itemImage,
    };

    const response = await fetch('http://ec2-18-221-130-93.us-east-2.compute.amazonaws.com:3001/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      fetchData();
      setItemName('');
      setItemQuantity('');
      setItemImage(null);
    } else {
      alert('Failed to create the item.');
    }
  };

  const startEditing = (item) => {
    setEditingItemId(item._id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const handleUpdateItem = async (id) => {
    if (!editName || !editQuantity) {
      alert('Name and quantity fields cannot be empty.');
      return;
    }

    const response = await fetch(`http://ec2-18-221-130-93.us-east-2.compute.amazonaws.com:3001/api/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, quantity: Number(editQuantity) }),
    });

    if (response.ok) {
      fetchData();
      setEditingItemId(null);
    } else {
      alert('Failed to update the item.');
    }
  };

  const handleDeleteItem = async (id) => {
    const response = await fetch(`http://ec2-18-221-130-93.us-east-2.compute.amazonaws.com:3001/api/inventory/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchData();
    } else {
      alert('Failed to delete the item.');
    }
  };

  return (
    <div className='inventory-container'>
      <div className='item-inputs'>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <input type="file" accept="image/*" // Accept only image files
        onChange={(e) => setItemImage(e.target.files[0])} // Update the state with the selected file
        />
        <button className="save-btn" onClick={handleCreateItem}>Add Item</button>
      </div>
      {inventoryItems.map((item) => (
        <div key={item._id} className='item'>
          {editingItemId === item._id ? (
            <div className='item-details'>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
              />
              <button className="save-btn" onClick={() => handleUpdateItem(item._id)}>Save</button>
            </div>
          ) : (
            <div className='item-list'>
              <p>Name: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <button className='update-btn' onClick={() => startEditing(item)}>Update</button>
              <button className='delete-btn' onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default InventoryManagement;
