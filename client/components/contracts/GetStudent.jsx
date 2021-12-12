import React, { Component } from "react";

class GetStudents extends React.Component {
  state = {
    dataKey: null,
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Students;
    const dataKey = contract.methods["get"].cacheCall({
      from: drizzleState.accounts[1],
    });
    this.setState({ dataKey });
  }
  render() {
    const Students = this.props.drizzleState.contracts.Students;
    const student_array = Students.get[this.state.dataKey];
    console.log(student_array);
    return <div></div>;
  }
}

export default GetStudents;
