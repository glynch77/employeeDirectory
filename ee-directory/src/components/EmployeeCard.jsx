import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const EmployeeCard = ({ employee }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            {/* Avatar image */}
            <Avatar
              alt={employee.fullName}
              src={employee.profilePic}
              sx={{ width: 60, height: 60 }} // Control the size of the avatar
            />
          </Grid>
          <Grid item xs>
            {/* Employee details */}
            <Typography variant="h6" gutterBottom>
              {employee.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {employee.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {employee.status || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              D.O.J: {employee.doj || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              D.O.L: {employee.dol || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: {employee.address || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: {employee.primaryPhone || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Secondary Phone: {employee.secondaryPhone || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Work Email: {employee.workEmail || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Personal Email: {employee.personalEmail || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
