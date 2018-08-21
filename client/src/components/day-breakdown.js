import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import React, { Component } from 'react';

import {
    getBreakdown,
    CUTOFF_BREAKFAST,
    CUTOFF_LUNCH,
    CUTOFF_DINNER,
} from 'modules/meal';


const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    totalOk: {
        backgroundColor: green[100],
    },
    totalOverflow: {
        backgroundColor: red[100],
    },
});

class Breakdown extends Component {
    render() {
        const { classes, meals, caloriesTarget } = this.props;

        const breakdown = getBreakdown(meals);

        return (
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Meal</TableCell>
                            <TableCell>Calories</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>[{ CUTOFF_BREAKFAST } - { CUTOFF_LUNCH }] Breakfast</TableCell>
                            <TableCell>{ breakdown.breakfast }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>[{ CUTOFF_LUNCH } - { CUTOFF_DINNER }] Lunch</TableCell>
                            <TableCell>{ breakdown.lunch }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>[{ CUTOFF_DINNER } - { CUTOFF_BREAKFAST }] Dinner</TableCell>
                            <TableCell>{ breakdown.dinner }</TableCell>
                        </TableRow>
                        <TableRow classes={{ root: breakdown.total > caloriesTarget ? classes.totalOverflow : classes.totalOk }}>
                            <TableCell>Total</TableCell>
                            <TableCell>{ breakdown.total } / { caloriesTarget }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(Breakdown);
