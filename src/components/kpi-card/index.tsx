import { Box, Typography, Card, CardContent } from '@mui/material';

export const KPICard = ({ title, count, icon }: { title: string; count: number; icon?: React.ReactNode }) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing={0.5}
          >
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: 'primary.main', opacity: 0.7 }}>
              {icon}
            </Box>
          )}
        </Box>
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          {count.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};