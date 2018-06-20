import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let myHeight = null;
    let myWidth = "450px";
    let myCols = [
      {Header: "", accessor: "name", width:160, resizable:false},
      {Header: "PTS", accessor: "pts", width:40, resizable:false},
      {Header: "3PT", accessor: "tre", width:40, resizable:false},
      {Header: "REB", accessor: "reb", width:40, resizable:false},
      {Header: "AST", accessor: "ast", width:40, resizable:false},
      {Header: "STL", accessor: "stl", width:40, resizable:false},
      {Header: "BLK", accessor: "blk", width:40, resizable:false},
      {Header: "TO", accessor: "tos", width:40, resizable:false}
    ];

    if(this.props.stats){
      if(this.props.stats.length === 2) {
        myHeight = null;
        myWidth = "450px";
        myCols = [
          {Header: "", accessor: "name", width:160, resizable:false},
          {Header: "PTS", accessor: "pts", width:40, resizable:false},
          {Header: "3PT", accessor: "tre", width:40, resizable:false},
          {Header: "REB", accessor: "reb", width:40, resizable:false},
          {Header: "AST", accessor: "ast", width:40, resizable:false},
          {Header: "STL", accessor: "stl", width:40, resizable:false},
          {Header: "BLK", accessor: "blk", width:40, resizable:false},
          {Header: "TO", accessor: "tos", width:40, resizable:false}
        ];
      } else {
        myHeight = "300px";
        myWidth = "520px";
        myCols = [
          {Header: "", accessor: "name", width:160, resizable:false},
          {Header: "MIN", accessor: "min", width:60, resizable:false},
          {Header: "PTS", accessor: "pts", width:40, resizable:false},
          {Header: "3PT", accessor: "tre", width:40, resizable:false},
          {Header: "REB", accessor: "reb", width:40, resizable:false},
          {Header: "AST", accessor: "ast", width:40, resizable:false},
          {Header: "STL", accessor: "stl", width:40, resizable:false},
          {Header: "BLK", accessor: "blk", width:40, resizable:false},
          {Header: "TO", accessor: "tos", width:35, resizable:false}
        ]
      }
    }
    

    return (
      <div className="flex-parent">
        <ReactTable 
          showPagination={false}
          data={this.props.stats}
          columns={myCols}
          pageSize={this.props.stats.length}
          className="-highlight small-font"
          style={{
            height: myHeight,
            width: myWidth
          }}
        />
      </div>
    )
  }
}