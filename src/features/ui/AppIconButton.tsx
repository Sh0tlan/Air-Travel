import { Button, type SxProps, type Theme } from '@mui/material';

interface Props {
  isSmall: boolean;
  onClick: () => void;
  'aria-label': string;
  children: JSX.Element;
  sx?: SxProps<Theme>;
}

export default function AppIconButton({
  isSmall,
  onClick,
  'aria-label': ariaLabel,
  children,
  sx = {},
}: Props) {
  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel}
      variant="outlined"
      sx={{
        borderRadius: 2,
        minWidth: 'auto',
        width: isSmall ? 34 : 58,
        height: isSmall ? 34 : 58,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
