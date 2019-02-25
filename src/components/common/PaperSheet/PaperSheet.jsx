import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: '#f1f2f6'
  }
});

function PaperSheet(props) {
  const { classes, title } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {title && (
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
        )}
        <br />
        <Typography component="span">{props.children}</Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
