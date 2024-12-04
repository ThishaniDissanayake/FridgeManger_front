import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]); 
  const [greeting, setGreeting] = useState(""); 

  
  const fetchItems = () => {
    fetch("https://localhost:7174/api/FridgeItems")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems(); 

    
    const hourlyRefresh = setInterval(fetchItems, 1000 * 60 * 60);

    return () => clearInterval(hourlyRefresh); 
  }, []);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateGreeting(); 
    const intervalId = setInterval(updateGreeting, 1000 * 60); 

    return () => clearInterval(intervalId); 
  }, []);

  const addItem = (item) => {
    
    setItems([...items, item]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    fetch(`https://localhost:7174/api/FridgeItems/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error(err));
  };

  const getFridgeMessage = (items) => {
    const currentDate = new Date(); 

    
    const healthyItems = items.filter(
      (item) => new Date(item.expiryDate) > currentDate && item.category === "healthy"
    );
    const expiredItems = items.filter((item) => new Date(item.expiryDate) <= currentDate);

    
    const shoppingDate = new Date();
    shoppingDate.setDate(currentDate.getDate() + 1);

    
    if (healthyItems.length >= 5) {
      return "🥳 Your fridge looks good for now!";
    }

    let message = `🛒 Your fridge is running low! You might want to go shopping on ${shoppingDate.toDateString()}.`;

    if (expiredItems.length > 0) {
      message += ` ❗ You have ${expiredItems.length} expired item(s)! Please remove that.`;
    }

    return message;
  };

  return (
    <div className="app min-h-screen bg-gray-100 pt-10 p-5 text-center container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{greeting}, Johny!</h1>
      <p className="text-lg text-gray-700">{getFridgeMessage(items)}</p>
      <AddItemForm onAddItem={addItem} />
      <ItemList items={items} onDeleteItem={deleteItem} />
    </div>
  );
};

export default App;
