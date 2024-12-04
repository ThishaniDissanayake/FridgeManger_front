import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const newItem = {
      name: itemName,
      expiryDate: expiryDate,
      status: "Healthy",
    };

    try {
      const response = await axios.post(
        "https://localhost:7174/api/FridgeItems",
        newItem
      );

      console.log("Item posted:", response.data);

      onAddItem(response.data);

      setItemName("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      <form
        className="flex items-center gap-4 bg-white p-6 shadow-md rounded-md w-full"
        onSubmit={handleSubmit}
      >
       
        <div className="flex-1">
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
            🍉 Item Name
          </label>
          <input
            id="itemName"
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            💧 Expiry Date
          </label>
          <input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-[50px] px-6 py-2 rounded-md text-white font-semibold shadow-md self-end transition-colors 
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-900 active:bg-blue-800"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add to Fridge"}
        </button>
      </form>

      <div className="w-full text-center mt-4 text-sm text-gray-500">
        ⚠️ We Don’t Want More Than One Piece Of The Same Food In Our Fridge.
      </div>
    </div>
  );
};

export default AddItemForm;
