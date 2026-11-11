import Button from "@mui/material/Button";

type CreateModalButtonProps = {
  label: string;
  onClick: () => void;
};

export default function CreateModalButton({ label, onClick }: CreateModalButtonProps) {
  return (
    <Button
      type="button"
      variant="contained"
      color="success"
      onClick={onClick}
      aria-haspopup="dialog"
      sx={{
        position: "fixed",
        right: {
          xs: "calc(16px + env(safe-area-inset-right, 0px))",
          sm: "calc(24px + env(safe-area-inset-right, 0px))",
        },
        bottom: {
          xs: "calc(16px + env(safe-area-inset-bottom, 0px))",
          sm: "calc(24px + env(safe-area-inset-bottom, 0px))",
        },
        zIndex: (theme) => theme.zIndex.fab,
        minHeight: 48,
        maxWidth: "calc(100% - 48px - env(safe-area-inset-right, 0px))",
        px: 3,
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
}
