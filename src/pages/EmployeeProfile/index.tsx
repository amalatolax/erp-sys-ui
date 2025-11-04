import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  User,
  Clock,
  Award,
  Edit3,
  Download,
  MoreVertical,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import useEmployeeProfile from "../../hooks/useEmployeeProfile";

const EmployeeProfilePage = () => {
  const { employee, loading } = useEmployeeProfile();
  const [activeTab, setActiveTab] = useState<"profile" | "documents">(
    "profile"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 max-w-md text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <User className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            No employee selected
          </h2>
          <p className="text-slate-500">
            Please select an employee from the dashboard to view their profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200 rounded-t-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image with Status */}
            <div className="relative">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-28 h-28 rounded-2xl object-cover shadow-md ring-4 ring-white"
              />
              <div
                className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                  employee.status === "Active"
                    ? "bg-emerald-500"
                    : employee.status === "On Leave"
                    ? "bg-amber-500"
                    : "bg-slate-400"
                }`}
              ></div>
            </div>

            {/* Employee Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">
                    {employee.name}
                  </h1>
                  <p className="text-slate-600 text-lg mb-3">{employee.role}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        employee.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                          : employee.status === "On Leave"
                          ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                          : "bg-slate-100 text-slate-700 ring-1 ring-slate-600/20"
                      }`}
                    >
                      {employee.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      <Briefcase className="w-4 h-4" />
                      {employee.department}
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: "profile", label: "Profile" },
              { id: "documents", label: "Documents" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-1 py-4 font-medium text-sm transition-all relative ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto py-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <ContactRow
                    icon={<Mail className="w-5 h-5 text-slate-400" />}
                    label="Email Address"
                    value={employee.email}
                  />
                  <ContactRow
                    icon={<Phone className="w-5 h-5 text-slate-400" />}
                    label="Phone Number"
                    value={employee.phone}
                  />
                </div>
              </div>

              {/* Employment Details */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                  </div>
                  Employment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailCard
                    icon={<Calendar className="w-5 h-5 text-blue-600" />}
                    label="Join Date"
                    value={new Date(employee.joinDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    bg="bg-blue-50"
                  />
                  <DetailCard
                    icon={<Clock className="w-5 h-5 text-violet-600" />}
                    label="Tenure"
                    value={calculateTenure(employee.joinDate)}
                    bg="bg-violet-50"
                  />
                  <DetailCard
                    icon={<Briefcase className="w-5 h-5 text-orange-600" />}
                    label="Department"
                    value={employee.department}
                    bg="bg-orange-50"
                  />
                  <DetailCard
                    icon={<Award className="w-5 h-5 text-emerald-600" />}
                    label="Position"
                    value={employee.role}
                    bg="bg-emerald-50"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Compensation Card */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium opacity-90">
                    Annual Salary
                  </span>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2">
                  ${employee.salary.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <span>
                    ${Math.round(employee.salary / 12).toLocaleString()}/month
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="opacity-90">Next review in 3 months</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <StatRow
                    label="Documents"
                    value={employee.documents.length.toString()}
                    icon={<FileText className="w-4 h-4 text-blue-600" />}
                  />
                  <StatRow
                    label="Active Projects"
                    value="8"
                    icon={<Briefcase className="w-4 h-4 text-emerald-600" />}
                  />
                  <StatRow
                    label="Tasks Completed"
                    value="847"
                    icon={<Award className="w-4 h-4 text-amber-600" />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Documents
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Manage and view employee documents
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            {employee.documents.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center bg-slate-50">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  No documents yet
                </h4>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                  Upload important documents like contracts, certifications, or
                  identification
                </p>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors shadow-sm">
                  <Upload className="w-4 h-4" />
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employee.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 hover:border-slate-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm flex-shrink-0">
                        <FileText className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-500">{doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const ContactRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-900 truncate">{value}</p>
    </div>
  </div>
);

const DetailCard = ({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) => (
  <div className="flex items-start gap-3">
    <div
      className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const StatRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
        {icon}
      </div>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
    <span className="text-lg font-semibold text-slate-900">{value}</span>
  </div>
);

// Helper Functions
const calculateTenure = (joinDate: string): string => {
  const join = new Date(joinDate);
  const now = new Date();
  const months =
    (now.getFullYear() - join.getFullYear()) * 12 +
    (now.getMonth() - join.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  } else {
    return `${years}y ${remainingMonths}m`;
  }
};

export default EmployeeProfilePage;
