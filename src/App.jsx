/** @format */

import { useState } from "react";
import MySidebar from "./components/Sidebar/Sidebar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { ThemeContext } from "./theme/ThemeContext";
import * as React from "react";
import CssBase from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { getThemePallete } from "./theme/ThemePallete";
import { Outlet } from "react-router-dom";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("botTheme") || "light");
  const [chat, setChat] = useState([]);
  const [menu, setMyMenu] = useState(false);

  //create theme
  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  //save theme mode in localstorage
  useEffect(() => {
    localStorage.setItem("botTheme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <ThemeProvider theme={theme}>

        <CssBase />
        <Grid
          container
          sx={{
            background:
              "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
          }}
        >
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{
              bgcolor: "primary.light",
              "@media (max-width:800px)": {
                width: "70%",
                transform: menu ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 400ms ease",
              },
            }}
            position={{ xs: "fixed", md: "relative" }}
            height={"100vh"}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menu ? 10 : 0, md: 0 }}
          >
            <MySidebar setChat={setChat} closeMenu={() => setMyMenu(false)} />
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Outlet
              context={{
                chat: chat,
                setChat: setChat,
                handleMobileMenu: setMyMenu,
              }}
            />
          </Grid>

        </Grid>

      </ThemeProvider>

    </ThemeContext.Provider>
  );
}

export default App;
