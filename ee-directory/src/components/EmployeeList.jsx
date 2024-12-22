import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const EmployeeList = ({ employees }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: 'collapse' }}>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h6">Photo</Typography>
            </TableCell>
            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h6">Full Name</Typography>
            </TableCell>
            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h6">Position</Typography>
            </TableCell>
            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h6">Phone</Typography>
            </TableCell>
            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' }}>
              <Typography variant="h6">Email</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                <img
                  src={employee.profilePic}
                  alt={employee.fullName}
                  style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                <Typography variant="body1">{employee.fullName}</Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                <Typography variant="body1">{employee.position}</Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                <Typography variant="body1">{employee.primaryPhone}</Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                <Typography variant="body1">{employee.workEmail}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
