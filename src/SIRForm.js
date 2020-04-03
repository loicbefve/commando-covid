import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        grid: {
            // paddingLeft: '2em',
            // paddingRight: '2em',
        },
        actions: {
            float: 'left',
            margin: theme.spacing(1),
        },
        textField: {
            // padding: theme.spacing(2),
            // textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const validationSchema = (t) =>
    Yup.object().shape({
        S: Yup.number()
            .typeError('error.shouldBeNumber')
            .positive('error.positiveNumber')
            .min(10, 'error.tooSmall')
            .max(20, 'error.tooLarge')
            .required('error.required'),
    });

export const SIRForm = ({ onChange }) => {
    const classes = useStyles();

    const initialValues = {
        S: '',
    };

    const name_S = 'S';
    const name_I = 'I';
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                onChange({ s: values['S'], i: values['I'], r: 1 });
            }}
            validationSchema={validationSchema()}
        >
            {({ values, touched, errors, handleChange, handleBlur }) => (
                <Form>
                    <Grid
                        className={classes.grid}
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <FormControl className={classes.formControl}>
                            <TextField
                                className={classes.textField}
                                name={name_S}
                                label={'Parametre S'}
                                value={values[name_S]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={errors[name_S] && touched[name_S] && errors[name_S]}
                                error={Boolean(errors[name_S] && touched[name_S])}
                            ></TextField>
                            <TextField
                                className={classes.textField}
                                name={name_I}
                                label={'Parametre I'}
                                value={values[name_I]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={errors[name_I] && touched[name_I] && errors[name_I]}
                                error={Boolean(errors[name_I] && touched[name_I])}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Button
                        className={classes.actions}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Calculer
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
