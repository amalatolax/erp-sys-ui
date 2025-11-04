import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyEmployees } from "../data/dummy.data";
import { Employee } from "../types";

const useEmployeeProfile = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      const found = dummyEmployees.find((emp) => emp.id === employeeId);
      setEmployee(found || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [employeeId]);

  return {
    employee,
    loading,
  };
};

export default useEmployeeProfile;
