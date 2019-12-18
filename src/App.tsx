import React, { useState, useEffect } from "react";
import Documentation from "@open-rpc/docs-react";
import { lightTheme, darkTheme } from "./themes/openrpcTheme";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import * as monaco from "monaco-editor";
import "./App.css";
import { MuiThemeProvider, CssBaseline, Toolbar, Grid, Typography, Tooltip, IconButton } from "@material-ui/core";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const t = darkMode ? "vs-dark" : "vs";
    monaco.editor.setTheme(t);
  }, [darkMode]);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (!event.data.method) {
        return;
      }
      switch (event.data.method) {
        case "updateSchema":
          setSchema(event.data.params.schema);
          break;

        default:
          break;
      }
    });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Toolbar>
        <Grid container alignContent="center" alignItems="center" justify="flex-start">
          <img
            alt="playground-title"
            height="30"
            src={"https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png"} />
          <Typography variant="h6">
            OpenRPC
          </Typography>
        </Grid>
        <Grid container justify="flex-end">
          <Tooltip title={"Toggle Dark Mode"}>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness3Icon /> : <WbSunnyIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
      </Toolbar>
      <div style={{padding: "20px"}}>
        <CssBaseline />
        <Documentation schema={schema as any} />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
