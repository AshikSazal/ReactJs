import React, {useState} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import List from "@mui/material/List";
import Home from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomePage from "./components/HomePage";
import Product from "./components/Product";
import Order from "./components/Order";
import Customer from "./components/Customer";
import ListItems from "./components/ListItems";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
  <ListItems
    icon={<Home />}
    text="Home"
    sublist={[      { path: "/electro", text: "Electronics" },      { path: "/furniture", text: "Furniture" },      { path: "/clothing", text: "Clothing" }    ]}
  />
  <ListItems
    icon={<AddShoppingCartIcon />}
    text="Order"
    sublist={[      { path: "/electro/order", text: "Electronics Order" },      { path: "/furniture/order", text: "Furniture Order" },      { path: "/clothing/order", text: "Clothing Order" }    ]}
  />
  <ListItems
    icon={<Inventory2Icon />}
    text="Product"
    sublist={[      { path: "/electro/product", text: "Electronics Product" },      { path: "/furniture/product", text: "Furniture Product" },      { path: "/clothing/product", text: "Clothing Product" }    ]}
  />
  <ListItems
    icon={<PermIdentityIcon />}
    text="Customer"
    sublist={[      { path: "/electro/customer", text: "Electronics Customer" },      { path: "/furniture/customer", text: "Furniture Customer" },      { path: "/clothing/customer", text: "Clothing Customer" }    ]}
  />
</List>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
            <Route exact path="/electro" element={<HomePage />}/>
            <Route path="/electro/order" element={<Order />}/>
            <Route path="/electro/product" element={<Product />}/>
            <Route path="/electro/customer" element={<Customer />}/>
        </Routes>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
