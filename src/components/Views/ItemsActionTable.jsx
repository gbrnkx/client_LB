/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import axios from 'axios';
import ItemDetail from './ItemDetail'

import ControlledOpenSelect from '../selectors/ControlledOpenSelect'
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.Component {

  getAllItems = () =>{
    axios.get('http://localhost:5000/api/getItems')
    .then(responseFromApi => {
      this.setState({
        itemsRows: responseFromApi.data
      })
    })
  }

  componentWillMount(){
      this.getAllItems()
  }

  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
      {/* {console.log(cellData)} */}
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
          
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

let dataItems = []
const data = [
  ['AAAA', 159, 6.0, 24, 4.0,<ControlledOpenSelect/>],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3,<ControlledOpenSelect/>],
  ['Eclair', 262, 16.0, 24, 6.0,<ControlledOpenSelect/>],
  ['Cupcake', 305, 3.7, 67, 4.3,<ControlledOpenSelect/>],
  ['Gingerbread', 356, 16.0, 49, 3.9,<ControlledOpenSelect/>],
];

let id = 0;
// function createData(dessert, calories, fat, carbs, protein, actions) {
//   id += 1;
//   return { id, dessert, calories, fat, carbs, protein, actions};
// }

function prepareData(item) {
  
  //console.log(item)
  id += 1;
  return {
    id:id, 
    pc9:<ItemDetail {...item}/>,
    brand:item.brand, 
    gender:item.gender, 
    line:item.line, 
    name:item.name, 
    status:item.status,
    actions:<Button variant="contained" size="small" color="primary" >><PhotoCamera/></Button>,
    extendedDescription:item.extendedDescription
  }
}

const rows = [];

// for (let i = 0; i < 200; i += 1) {
//   const randomSelection = data[Math.floor(Math.random() * data.length)];
//   rows.push(createData(...randomSelection));
// }


  axios.get('http://localhost:5000/api/getItems')
  .then(response => {
    for(var i=0;i<response.data.length;i++){
      rows.push(prepareData(response.data[i]))
    }
  })



  // dataItems.map(item => {
  //   rows.push(prepareData(item)
  // )})
 //console.log(rows)

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}

        rowGetter={({ index }) => rows[index]}
        onRowClick={event => console.log(event)}
        columns={[
          {
            width: 120,
            label: 'PC9',
            dataKey: 'pc9',
          },
          {
            width: 120,
            label: 'MARCA',
            dataKey: 'brand',
            numeric: false,
          },
          {
            width: 120,
            label: 'CATEGORIA',
            dataKey: 'gender',
            numeric: false,
          },
          {
            width: 120,
            label: 'LÍNEA',
            dataKey: 'line',
            numeric: false,
          },
          {
            width: 120,
            flexGrow: 1.0,
            label: 'NOMBRE',
            dataKey: 'name',
            numeric: false,
          },
          {
            width: 120,
            label: 'ESTATUS',
            dataKey: 'status',
            numeric: false,
          },
          {
            width: 120,
            label: 'ACCIONES',
            dataKey: 'actions',
            numeric: false,
          }

        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;