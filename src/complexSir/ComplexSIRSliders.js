import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { useTranslate } from 'react-polyglot';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: 250,
        },
        input: {
            width: 75,
        },
        slider: {
            width: 100,
        },
        sliderWithInput: {
            margin: theme.spacing(2),
        },
    }),
);

const SliderWithInput = ({
    name,
    value,
    min,
    max,
    step,
    onSliderChange,
    onInputChange,
    onBlur,
    tooltipTitle,
}) => {
    const classes = useStyles();
    const t = useTranslate();

    return (
        <div className={classes.sliderWithInput}>
            <Tooltip title={tooltipTitle ? tooltipTitle : t(`form.tip.${name}`)}>
                <Typography id="input-slider" gutterBottom>
                    {t(`form.${name}`)}
                </Typography>
            </Tooltip>

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Slider
                        name={name}
                        className={classes.slider}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(event, newValue) => {
                            onSliderChange(event, newValue, name);
                        }}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        name={name}
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={(event) => onInputChange(event, name)}
                        onBlur={(event, newValue, name) => onBlur(event, newValue, name)}
                        inputProps={{
                            step,
                            min,
                            max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

const stateReducer = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case 'SET_POPULATION':
            return { ...state, population: action.payload };
        case 'SET_KPE':
            return { ...state, kpe: action.payload };
        case 'SET_KRD':
            return { ...state, krd: action.payload };
        case 'SET_R0':
            return { ...state, r0: action.payload };
        case 'SET_TAUX_TGS':
            return { ...state, taux_tgs: action.payload };
        case 'SET_TAUX_THR':
            return { ...state, taux_thr: action.payload };
        case 'SET_TEM':
            return { ...state, tem: action.payload };
        case 'SET_TMG':
            return { ...state, tmg: action.payload };
        case 'SET_TMH':
            return { ...state, tmh: action.payload };
        case 'SET_THG':
            return { ...state, thg: action.payload };
        case 'SET_THR':
            return { ...state, thr: action.payload };
        case 'SET_TRSR':
            return { ...state, trsr: action.payload };
        case 'SET_LIM_TIME':
            return { ...state, lim_time: action.payload };
        default:
            return state;
    }
};

const setters = {
    population: 'SET_POPULATION',
    kpe: 'SET_KPE',
    krd: 'SET_KRD',
    r0: 'SET_R0',
    taux_tgs: 'SET_TAUX_TGS',
    taux_thr: 'SET_TAUX_THR',
    tem: 'SET_TEM',
    tmg: 'SET_TMG',
    tmh: 'SET_TMH',
    thg: 'SET_THG',
    thr: 'SET_THR',
    trsr: 'SET_TRSR',
    lim_time: 'SET_LIM_TIME',
};

const initialState = {
    population: 500000,
    kpe: 0.6,
    krd: 0.5,
    r0: 2.3,
    taux_tgs: 0.81,
    taux_thr: 0.05,
    tem: 6,
    tmg: 9,
    tmh: 6,
    thg: 6,
    thr: 1,
    trsr: 8,
    lim_time: 250,
};

export default function ComplexSIRSliders({ onChange }) {
    const classes = useStyles();
    const [values, dispatch] = React.useReducer(stateReducer, initialState);

    const {
        population,
        kpe,
        krd,
        r0,
        taux_tgs,
        taux_thr,
        tem,
        tmg,
        tmh,
        thg,
        thr,
        trsr,
        lim_time,
    } = values;

    React.useEffect(() => {
        onChange(values);
    }, [onChange, values]);

    const handleSliderChange = React.useCallback(
        (event, newValue, name) => dispatch({ type: setters[name], payload: parseFloat(newValue) }),
        [dispatch],
    );

    const handleInputChange = React.useCallback((event, name) => {
        if (event.target.value === '') {
            // setters[name](parseFloat(event.target.min));
            dispatch({ type: setters[name], payload: parseFloat(event.target.min) });
        } else {
            // setters[name](parseFloat(event.target.value));
            dispatch({ type: setters[name], payload: parseFloat(event.target.value) });
        }
    }, []);

    const handleBlur = React.useCallback(
        (event, name) => {
            if (event.target.value < event.target.min) {
                // setters[name](parseFloat(event.target.min));
                dispatch({ type: setters[name], payload: parseFloat(event.target.min) });
            }
            if (event.target.value > event.target.max) {
                // setters[name](parseFloat(event.target.max));
                dispatch({ type: setters[name], payload: parseFloat(event.target.max) });
            }
        },
        [dispatch],
    );

    return (
        <Grid container direction="column" justify="right" alignItems="center">
            <Grid
                className={classes.grid}
                container
                direction="row"
                justify="right"
                alignItems="center"
            >
                <SliderWithInput
                    name="population"
                    value={population}
                    min={1}
                    max={1000000}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="kpe"
                    value={kpe}
                    min={0}
                    max={1}
                    step={0.01}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="r0"
                    value={r0}
                    min={0}
                    max={5}
                    step={0.01}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />

                <SliderWithInput
                    name="taux_tgs"
                    value={taux_tgs}
                    min={0}
                    max={1}
                    step={0.01}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="taux_thr"
                    value={taux_thr}
                    min={0}
                    max={1}
                    step={0.01}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="krd"
                    value={krd}
                    min={0}
                    max={1}
                    step={0.01}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </Grid>
            <Grid
                className={classes.grid}
                container
                direction="row"
                justify="right"
                alignItems="center"
            >
                <SliderWithInput
                    name="tem"
                    value={tem}
                    min={0}
                    max={30}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="tmg"
                    value={tmg}
                    min={0}
                    max={30}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="tmh"
                    value={tmh}
                    min={0}
                    max={30}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="thg"
                    value={thg}
                    min={0}
                    max={30}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <SliderWithInput
                    name="thr"
                    value={thr}
                    min={0}
                    max={30}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />

                <SliderWithInput
                    name="trsr"
                    value={trsr}
                    min={0}
                    max={20}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />

                <SliderWithInput
                    name="lim_time"
                    value={lim_time}
                    min={0}
                    max={1000}
                    step={1}
                    onSliderChange={handleSliderChange}
                    onInputChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </Grid>
        </Grid>
    );
}
