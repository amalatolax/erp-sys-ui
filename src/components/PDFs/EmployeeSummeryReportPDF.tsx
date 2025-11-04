import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Employee } from "../../types";

// 🎨 Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },

  // Header
  header: {
    alignItems: "center",
    borderBottom: "2px solid #2E86C1",
    paddingBottom: 12,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E86C1",
  },
  reportTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  // Section Title
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2E4053",
    backgroundColor: "#EBF5FB",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderLeft: "3px solid #2E86C1",
    marginBottom: 10,
  },

  // Table Styles
  table: {
    width: "auto",
    borderWidth: 1,
    borderColor: "#D6DBDF",
    borderStyle: "solid",
    borderRadius: 4,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#D6EAF8",
    borderBottom: "1px solid #A9CCE3",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #E5E7E9",
  },
  tableCell: {
    fontSize: 9,
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRight: "0.5px solid #D6DBDF",
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  noBorder: {
    borderRight: "none",
  },

  // Footer
  footer: {
    marginTop: 25,
    fontSize: 9,
    textAlign: "center",
    color: "#7F8C8D",
    borderTop: "1px solid #ccc",
    paddingTop: 8,
  },
});

// 🧩 Component
interface EmployeeReportPDFProps {
  employees: Employee[];
}

const EmployeeReportPDF: React.FC<EmployeeReportPDFProps> = ({ employees }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB");

  const formatCurrency = (amount: number) =>
    `Rs. ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>ABC Pvt Ltd</Text>
          <Text style={styles.reportTitle}>Employee Details Report</Text>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Employee List</Text>

        {/* Table */}
        {employees.length > 0 ? (
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableCellHeader, { flex: 0.5 }]}>#</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Name</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.2 }]}>Role</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.2 }]}>
                Department
              </Text>
              <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Email</Text>
              <Text style={[styles.tableCellHeader, { flex: 1 }]}>Phone</Text>
              <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>
                Join Date
              </Text>
              <Text style={[styles.tableCellHeader, { flex: 1 }]}>Salary</Text>
              <Text
                style={[styles.tableCellHeader, { flex: 0.8 }, styles.noBorder]}
              >
                Status
              </Text>
            </View>

            {/* Table Rows */}
            {employees.map((emp, index) => (
              <View key={emp.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.5 }]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  {emp.name}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>
                  {emp.role}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>
                  {emp.department}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  {emp.email}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{emp.phone}</Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>
                  {formatDate(emp.joinDate)}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {formatCurrency(emp.salary)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      flex: 0.8,
                      color: emp.status === "Active" ? "#1E8449" : "#B03A2E",
                    },
                    styles.noBorder,
                  ]}
                >
                  {emp.status}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ fontSize: 10, color: "#999" }}>
            No employees available.
          </Text>
        )}

        {/* Footer */}
        <Text style={styles.footer}>Generated by ABC HR Management System</Text>
      </Page>
    </Document>
  );
};

export default EmployeeReportPDF;
