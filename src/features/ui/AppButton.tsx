import LoadingButton from '@mui/lab/LoadingButton';
import { type SxProps, type Theme, Typography } from '@mui/material';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  LinkComponent?: React.ElementType;
  href?: string;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = 'button',
  variant = 'contained',
  fullWidth,
  onClick,
  children,
  href,
  LinkComponent,
  loading,
  endIcon,
  sx,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={LinkComponent}
      href={href}
      loading={loading}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      endIcon={endIcon}
      sx={{
        borderRadius: 2,
        height: { xs: 48, md: 56 },
        textTransform: 'none',
        ...sx,
      }}
      onClick={onClick}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </LoadingButton>
  );
}
