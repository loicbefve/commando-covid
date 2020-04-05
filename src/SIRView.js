import React from 'react';
import { SIRForm } from './SIRForm';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Chart } from './ChartView';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);
export const SIRView = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState();
    // eslint-disable-next-line no-console
    console.log({ values });
    return (
        <div className={classes.root}>
            <Grid container direction="column" justify="center" alignItems="stretch" spacing={3}>
                <Grid item xs={12}>
                    <SIRForm onChange={(values) => setValues(values)} />
                </Grid>
                {values && <Grid item> {Chart(values)} </Grid>}
            </Grid>
        </div>
    );
};