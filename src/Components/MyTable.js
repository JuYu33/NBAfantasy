import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class MyTable extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const dummyData = [{
      fgs: 123,
      fts: 34,
      tre: 6,
      pts: 99,
      reb: 10,
      ast: 1,
      stl: 0,
      blk: 8,
      tos: 1
    },{
      fgs: 23,
      fts: 34,
      tre: 16,
      pts: 81,
      reb: 18,
      ast: 11,
      stl: 10,
      blk: 81,
      tos: 11
    },{
      fgs: 50,
      fts: 3,
      tre: 6,
      pts: 9,
      reb: 1,
      ast: 1,
      stl: 0,
      blk: 8,
      tos: 1
    }]
    return (
      <ReactTable 

        // data={this.props.stats}
        data={dummyData}
        columns={[
          {Header: "FG%", accessor: "fgs", minWidth:55, resizable:false},
          {Header: "FT%",  accessor: "fts", minWidth:55, resizable:false},
          {Header: "3PT", accessor: "tre", minWidth:55, resizable:false},
          {Header: "PTS", accessor: "pts", minWidth:55, resizable:false},
          {Header: "REB", accessor: "reb", minWidth:55, resizable:false},
          {Header: "AST", accessor: "ast", minWidth:55, resizable:false},
          {Header: "STL", accessor: "stl", minWidth:55, resizable:false},
          {Header: "BLK", accessor: "blk", minWidth:55, resizable:false},
          {Header: "TO", accessor: "tos", minWidth:55, resizable:false}
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
      />
    )
  }
}