import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([{ name: "Demo Data.csv", size: "15 KB" }]);
  const [selectedDataset, setSelectedDataset] = useState("Demo Data.csv");
  const [columns, setColumns] = useState(["Vibrations", "Temperature", "Pressure"]); // Mocked column data
  const [selectedColumns, setSelectedColumns] = useState(["Vibrations"]); // Default selected column

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` }]);
    }
  };

  // Handle Download Sample CSV
  const handleDownloadSample = () => {
    const sampleData = "Column1,Column2,Column3\nValue1,Value2,Value3\n";
    const blob = new Blob([sampleData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Sample_Data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Column Selection
  const handleColumnSelection = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedColumns.includes(selectedValue)) {
      setSelectedColumns([...selectedColumns, selectedValue]);
    }
  };

    // Mock Sensors for Sale
    const sensors = [
        { id: 1, name: "Sensor A", price: "€2.0", image: "/assets/1.png" },
        { id: 2, name: "Sensor B", price: "€1.3", image: "/assets/2.png" },
        { id: 3, name: "Sensor C", price: "€1.7", image: "/assets/3.png" },
        { id: 4, name: "Sensor D", price: "€1.2", image: "/assets/4.png" },
      ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-4 w-full p-4">
      
      {/* Sidebar */}
      <div className="rounded-lg  p-4 shadow-md">
        <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
        <div className="flex flex-col space-y-2">
          <button
            className={`p-2 rounded-md text-left transition ${
              activeTab === "upload" ? "bg-orange-600 text-white" : " text-white hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Data
          </button>
          <button
            className={`p-2 rounded-md text-left transition ${
              activeTab === "updateGraph"? "bg-orange-600 text-white" : " text-white hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("updateGraph")}
          >
            Update Graph
          </button>
          <button
            className={`p-2 rounded-md text-left transition ${
              activeTab === "market" ? "bg-orange-600 text-white" : " text-white hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("market")}
          >
            Market Place
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="rounded-lg  lg:col-span-2 p-4 shadow-md">
        
        {/* Upload Data Section */}
        {activeTab === "upload" && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload Data</h3>
            <p className="text-white">Upload your dataset as a CSV file.</p>

            {/* File Upload */}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mt-2 p-2 bg-white border rounded-md w-full cursor-pointer"
            />

            {/* Download Sample CSV */}
            <button
              onClick={handleDownloadSample}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Download Sample CSV
            </button>

            {/* Uploaded Files List */}
            <div className="bg-white p-3 rounded-md shadow mt-4">
              <h4 className="text-md font-semibold text-gray-700">Uploaded Files</h4>
              <ul className="mt-2 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
                    <span className="text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">{file.size}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Train Machine Learning Model */}
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
              Train Machine Learning Model
            </button>
          </div>
        )}

        {/* Update Graph Section */}
        {activeTab === "updateGraph" && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Update Graph</h3>
            <p className="text-white">Modify and update your data visualization.</p>

            {/* Dataset Dropdown */}
            <label className="block text-white font-semibold mt-4">Select Dataset:</label>
            <select
              className="mt-1 p-2 w-full bg-white border rounded-md"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              {uploadedFiles.map((file, index) => (
                <option key={index} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>

            {/* Selected Columns Multi-Select Box */}
            <label className="block text-white font-semibold mt-4">Selected Columns:</label>
            <textarea
              className="mt-1 p-2 w-full bg-white border rounded-md"
              rows="3"
              readOnly
              value={selectedColumns.join(", ")}
            ></textarea>

            {/* Column Dropdown */}
            <label className="block text-white font-semibold mt-4">Select Column to Add:</label>
            <select
              className="mt-1 p-2 w-full bg-white border rounded-md"
              onChange={handleColumnSelection}
            >
              <option value="">-- Select Column --</option>
              {columns.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>

            <button className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Update Now
            </button>
          </div>
        )}

        {/* Market Place Section */}
        {activeTab === "market" && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Market Place</h3>
            <p className="text-white mb-4">Browse available sensors at affordable prices.</p>

            {/* Sensor Grid */}
            <div className="grid grid-cols-2 gap-4">
              {sensors.map((sensor) => (
                <div key={sensor.id} className=" p-4 rounded-lg shadow-md text-center">
                  <img src={sensor.image} alt={sensor.name} className="w-full h-32 object-contain mb-2" />
                  <h4 className="text-md font-semibold text-gray-800">{sensor.name}</h4>
                  <p className="text-white">{sensor.price}</p>
                  <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
