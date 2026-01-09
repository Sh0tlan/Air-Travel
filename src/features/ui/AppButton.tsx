import LoadingButton from '@mui/lab/LoadingButton';
import { type SxProps, type Theme, Typography } from '@mui/material';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  LinkComponent?: React.ElementType;
  href?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  isSmall?: boolean;
  color?:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning';
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
  startIcon,
  isSmall,
  disabled,
  color,
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
      disabled={disabled}
      startIcon={startIcon}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === 'text' || isSmall ? 42 : 48,
          md: variant === 'text' || isSmall ? 48 : 56,
        },
        textTransform: 'none',
        width: fullWidth ? '100%' : 'fit-content',
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
