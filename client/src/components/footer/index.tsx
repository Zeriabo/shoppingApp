import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Link
} from "@material-ui/core";
import {
  Security,
  Info
} from "@material-ui/icons";
import { FooterLink } from './style';


function Footer() {

  return (
    <>
    <Grid container justify="center" style={{minHeight: "212px"}}>
    <Grid container item sm={6} xs={11} justify="space-between">
        <Grid item sm={5} xs={12}>
            <Security color="action" />
            <Typography paragraph>
             This a demo shopping site 
            </Typography>
        </Grid>
        <Grid item sm={5} xs={11}>
            <Info color="action" />
            <Typography paragraph>
                This Web App is fully responsive. Made By Zeriab
            </Typography>
        </Grid>
    </Grid>
</Grid>
     <AppBar position="static" elevation={0} component="footer" color="default">
     <Toolbar style={{ justifyContent: "center" }}>
         <Typography variant="caption">©2022</Typography>
     </Toolbar>
 </AppBar>
</>
  );
}

export default Footer;
