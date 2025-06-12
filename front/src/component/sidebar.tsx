import React from "react";
const Sidebar = () => {
  return (
    <div className="bg-blue-300 p-10">
      <button className="bg-blue-900 text-white px-30 py-3 rounded hover:bg-green-700 text-center ">
        Upload Pdf
      </button>
      <div className="flex-1 pt-15">
        <h2 className="text-lg font-semibold mb-3 justify-center text-center">
          History
        </h2>
        <ul className="space-y-2">
          <li className="text-gray-600">No history yet.</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
