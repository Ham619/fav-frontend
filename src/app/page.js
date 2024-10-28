export default function Home() {
  return (
    <div>
      <div className="p-8 bg-gray-100 w-[95vw]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-700">App Dashboard</h1>
          <a href="#" className="text-gray-600">
            Click Here to Logout
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md h-28 flex items-center justify-center">
            <p className="text-gray-700">KPI 1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-28 flex items-center justify-center">
            <p className="text-gray-700">KPI 2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-28 flex items-center justify-center">
            <p className="text-gray-700">KPI 3</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md h-72">
            <p className="text-gray-700">Graph 1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-72">
            <p className="text-gray-700">Graph 2</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md h-52">
            <p className="text-gray-700">Action Panel</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-52">
            <p className="text-gray-700">Action Panel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
