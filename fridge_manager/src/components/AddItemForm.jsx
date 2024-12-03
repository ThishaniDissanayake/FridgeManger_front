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
    <form
      className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white p-6 shadow-md rounded-md w-full max-w-3xl mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-8 py-2 rounded-md text-white font-semibold shadow-md whitespace-nowrap transition-colors 
    ${
      isSubmitting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-800 hover:bg-blue-900 active:bg-blue-800"
    }`}
      >
        {isSubmitting ? "Adding..." : "Add to Fridge"}
      </button>
    </form>
  );
};

export default AddItemForm;
