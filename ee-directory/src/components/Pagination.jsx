import React from 'react';
import { Pagination as MuiPagination, Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

const Pagination = ({ page, totalPages, handlePageChange, itemsPerPage, handleItemsPerPageChange, top }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: top ? 'flex-end' : 'center', alignItems: 'center', width: '100%' }}>
      {/* If it's the top section, display the items per page dropdown */}
      {top ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Items per page:
          </Typography>

          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items per page"
              size="large" // Make the dropdown bigger
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        // If it's the bottom section, display pagination controls
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <MuiPagination
            count={totalPages}
            page={page}
            onChange={(event, value) => handlePageChange(value)}
            shape="rounded"
            variant="outlined"
            color="primary"
            sx={{ marginLeft: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Pagination;
