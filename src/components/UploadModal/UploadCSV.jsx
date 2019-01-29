import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  button: {
  marginLeft: -835,
   margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class UploadCSV extends React.Component {
  state = {
    open: false,
    checkedA: true,
    checkedB: true
  };


  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="default" className={classes.button} onClick={this.handleClickOpen}>
            Cargar CSV   
            <CloudUploadIcon className={classes.rightIcon} />
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cargar nuevo batch de PC9's</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>

            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleSwitchChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Solicitar búsqueda en almacen"
        />
            <br/>
            <input type="file"/>      
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
           </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UploadCSV.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadCSV);
