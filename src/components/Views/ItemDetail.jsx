import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

import Gallery from "../ImagesHandler/Gallery";
import DropzoneComponent from "react-dropzone-component";
import Chat from "../comments/Chat";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import stylesDropZone from ''

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  root: {
    flexGrow: 0.5
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  gridFlexGrow:{
    flexGrow: 1
  }
});

class MaxWidthDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "md",
    pc9: "",
    status: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  render() {
    const {
      classes,
      pc9,
      status,
      name,
      extendedDescription,
      gender,
      line
    } = this.props;
    var componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: "/uploadHandler"
    };
    var djsConfig = { autoProcessQueue: false };
    var eventHandlers = { addedfile: file => console.log(file) };
    return (
      <React.Fragment>
        <Link to="/" onClick={this.handleClickOpen}>
          {pc9}
        </Link>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">{pc9}</DialogTitle>
          <Divider />
          {/* <Typography gutterBottom>{status}</Typography> */}
          <DialogContent className={classes.details}>
            {/* <DialogContentText></DialogContentText> */}

            <div className={classes.gridFlexGrow}>
              <Grid container>
                <Grid container xs={12}>
                  <Grid item xs={4} spacing={16}>  
                    <Gallery pc9={pc9} />
                    {/* <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                    /> */}  
                  </Grid>
                  <Grid container xs={8}>  
                    <Grid item spacing={16}>  
                      <Typography gutterBottom variant="subtitle1">
                        {name}
                      </Typography>
                      <Typography gutterBottom>
                        {gender} / {line}
                      </Typography>
                      <Typography color="textSecondary">
                        {extendedDescription}
                      </Typography>
                    </Grid>

                    <Grid container xs={12}> 
                      <Grid item spacing={16}>  
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                        >
                          Aprobar
                        </Button>
                      </Grid>
                    </Grid> 
                  </Grid>
     
                </Grid>
                <Grid container xs={12}>
                    <Grid item spacing={16}>
                      <Chat/>
                    </Grid>   
                </Grid>
              </Grid>
            </div>

            {/* <Grid xs={12}>
              
                <Grid item xs={8} >
                  <Gallery pc9={pc9} />
                  <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                  />
                </Grid>

                <Grid item xs={10}>
                      <Typography gutterBottom variant="subtitle1">
                        {name}
                      </Typography>
                      <Typography gutterBottom>
                        {gender} / {line}
                      </Typography>
                      <Typography color="textSecondary">
                        {extendedDescription}
                      </Typography>
                </Grid>


                <Grid item xs={12} container>
                  <Grid item xs container direction="column" spacing={16}>

                  </Grid>
                  <Grid
                    item
                    xs
                    sm={3}
                    container
                    direction="column"
                    alignItems="flex-end"
                  >
                    <Grid item xs>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} >

              <Chat />
            </Grid> */}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaxWidthDialog);
