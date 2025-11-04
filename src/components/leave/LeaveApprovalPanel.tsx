import { Calendar, Clock, FileText, CheckCircle, XCircle, MessageSquare, User } from 'lucide-react';
import { LeaveRequest } from '../../types';

interface LeaveApprovalPanelProps {
  leave: LeaveRequest | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestInfo: (id: string) => void;
}

const LeaveApprovalPanel = ({ leave, onApprove, onReject, onRequestInfo }: LeaveApprovalPanelProps) => {
  if (!leave) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center sticky top-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Select a leave request</p>
        <p className="text-sm text-gray-400 mt-1">Choose from the list to view details</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-6">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Leave Details</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <img
            src={leave.employeeAvatar}
            alt={leave.employeeName}
            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
          />
          <h3 className="font-bold text-lg text-gray-900 mt-4">{leave.employeeName}</h3>
          <p className="text-sm text-gray-600">{leave.department}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
            {leave.status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Employee ID</p>
              <p className="font-medium text-gray-900">{leave.employeeId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Leave Type</p>
              <p className="font-medium text-gray-900">{leave.leaveType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">
                {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {' - '}
                {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Total Days</p>
              <p className="font-medium text-gray-900">{leave.duration} {leave.duration === 1 ? 'day' : 'days'}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Reason</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{leave.reason}</p>
        </div>

        <div className="text-xs text-gray-500 pt-4 border-t border-gray-100">
          Applied on {new Date(leave.appliedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {leave.status === 'Pending' && (
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <button
              onClick={() => onApprove(leave.id)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Approve Leave
            </button>

            <button
              onClick={() => onReject(leave.id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Reject Leave
            </button>

            <button
              onClick={() => onRequestInfo(leave.id)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Request Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApprovalPanel;
