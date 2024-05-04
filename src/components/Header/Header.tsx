import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { logoutRequest } from "helpers/api/auth";

export const Header = () => {
  const navigate = useNavigate();
  const clearSesion = useAuthStore((state) => state.setClearToken);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCerrarSesion = async () => {
    const resLogout = await logoutRequest();
    if (resLogout.statusText !== "OK") {
      alert("No se pudo cerrar la sesión");
      return;
    }
    resLogout.status === 200 && clearSesion();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between border-2 border-b-azulFuerte px-6 py-4">
      <div className="flex items-center gap-2">
        <Icon icon="mdi:menu" />
        <p>Panel</p>
      </div>
      <div>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Perfil">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Icon icon="mdi:user" />
            </ListItemIcon>
            Pefil
          </MenuItem>
          <MenuItem onClick={handleCerrarSesion}>
            <ListItemIcon>
              <Icon icon="mdi:logout" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};
