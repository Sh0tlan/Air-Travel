import AddIcon from '@mui/icons-material/Add';
import { Box, ButtonBase, SxProps, Theme, Typography } from '@mui/material';

import { Colors } from '@config/styles';

interface Props {
  mainText: string;
  subText: string;
  showSubText: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export default function UploadFileButton({
  mainText,
  subText,
  showSubText,
  onClick,
  sx,
}: Props) {
  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }} onClick={onClick}>
      <ButtonBase
        sx={{
          bgcolor: Colors.lightGreen,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          color: 'primary.main',
          borderRadius: 4,
          height: { xs: '100%', md: '100%' },
          width: '100%',
          px: 1,
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23729E65FF' stroke-width='4' stroke-dasharray='10%2c 20' stroke-dashoffset='96' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <AddIcon fontSize="large"></AddIcon>
        <Typography component="span" variant="body2">
          {mainText}
        </Typography>
        {showSubText && (
          <Typography component="span" variant="caption" color="text.secondary">
            {subText}
          </Typography>
        )}
      </ButtonBase>
    </Box>
  );
}
