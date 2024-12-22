import React, { useState } from 'react';
import { ThemeProvider, Container, Typography, AppBar, Toolbar, Box } from '@mui/material'; 
import EmployeeList from './components/EmployeeList';
import Pagination from './components/Pagination';
import employees from './data/employees'; // Assuming this is the correct path
import theme from './theme/theme'; // Import your theme

const App = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value); // Change items per page dynamically
    setPage(1); // Reset page to 1 when the number of items per page changes
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Calculate the employees to display on the current page
  const currentEmployees = employees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <ThemeProvider theme={theme}> 
      {/* AppBar with padding at the bottom */}
      <AppBar position="sticky" sx={{ paddingBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Directory
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: 4, backgroundColor: theme.palette.background.default }}>
        {/* Top Dropdown */}
        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            top={true} // Show dropdown at the top
          />
        </Box>

        {/* Header title */}
        <Typography variant="h3" align="center" gutterBottom>
          Employee Directory
        </Typography>

        {/* Employee list component */}
        <EmployeeList employees={currentEmployees} />

        {/* Bottom Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            top={false} // Show pagination at the bottom
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
