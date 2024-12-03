import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ItemList = ({ items, onDeleteItem }) => {
  const calculateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < today) return "Expired";
    if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) return "Expiring-soon";
    return "Healthy";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <div className="item-list p-6 bg-white shadow-md rounded-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Total items — <span className="text-blue-600"></span>
        {items.length}
      </h2>
      <table className="item-table w-full text-left border-collapse mt-6 border-collapse table-auto bg-white shadow rounded-md">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 border-b border-gray-300">Item Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Expiry Date</th>
            <th className="px-4 py-2 border-b border-gray-300">Status</th>
            <th className="px-4 py-2 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border-b border-gray-200 px-4 py-2">
                {item.name}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {formatDate(item.expiryDate)}
              </td>
              <td>
                <div
                  className={`w-32 text-center px-4 py-1 rounded-md inline-block text-sm font-medium ${
                    calculateStatus(item.expiryDate).toLowerCase() === "expired"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : calculateStatus(item.expiryDate).toLowerCase() ===
                        "expiring-soon"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : "bg-green-100 text-green-700 border border-green-300"
                  }`}
                >
                  {calculateStatus(item.expiryDate)}
                </div>
              </td>
              <td>
                <FaTrashAlt
                  className={`delete-icon cursor-pointer text-lg ${
                    calculateStatus(item.expiryDate).toLowerCase() === "expired"
                      ? "expired"
                      : "default"
                  }`}
                  onClick={() => onDeleteItem(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
