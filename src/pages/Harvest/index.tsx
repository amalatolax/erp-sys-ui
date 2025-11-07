import { useState } from "react";
import { Calendar, Save, RotateCcw } from "lucide-react";

const DailyHarvestCreateForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    workType: "",
    crop: "",
    estateId: "",
    division: "",
    manDays: "",
    labourType: "General",
    field: "",
    job: "",
    pluckingType: "",
    empNo: "",
    shift: "",
    fullHalf: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty: "",
    overKilos: "",
    areaCovered: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting harvest data:", formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daily Harvest Entry</h1>
        <p className="text-gray-600 mt-1">Record and manage normal work entries for tea harvest.</p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-6"
      >
        {/* Section 1: Basic Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Work Type</option>
                <option value="Normal">Normal Work</option>
                <option value="Holiday">Holiday</option>
                <option value="Paid Holiday">Paid Holiday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                placeholder="e.g., Tea"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Labour Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Labour Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Labour Type</label>
              <select
                name="labourType"
                value={formData.labourType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="General">General</option>
                <option value="Lent Labour">Lent Labour</option>
                <option value="Inter Estate Lent Labour">Inter Estate Lent Labour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estate ID</label>
              <input
                type="text"
                name="estateId"
                value={formData.estateId}
                onChange={handleChange}
                placeholder="Enter estate ID"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
              <input
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                placeholder="Enter division"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Plucking Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Plucking & Work Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plucking Type</label>
              <select
                name="pluckingType"
                value={formData.pluckingType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="Fine">Fine</option>
                <option value="Coarse">Coarse</option>
                <option value="Machine">Machine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee No</label>
              <input
                type="text"
                name="empNo"
                value={formData.empNo}
                onChange={handleChange}
                placeholder="Enter employee number"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Quantities */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Work Quantities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {["qty1", "qty2", "qty3", "qty", "overKilos", "areaCovered"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="number"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => setFormData({
              date: "",
              workType: "",
              crop: "",
              estateId: "",
              division: "",
              manDays: "",
              labourType: "General",
              field: "",
              job: "",
              pluckingType: "",
              empNo: "",
              shift: "",
              fullHalf: "",
              qty1: "",
              qty2: "",
              qty3: "",
              qty: "",
              overKilos: "",
              areaCovered: "",
            })}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm font-medium transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Save className="w-4 h-4" />
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyHarvestCreateForm;
