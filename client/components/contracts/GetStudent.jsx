import React, { Component } from "react";

class GetStudents extends React.Component {
  state = {
    dataKey: null,
    data: undefined,
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Students;
    const dataKey = contract.methods["get"].cacheCall();
    this.setState({ dataKey });
  }
  render() {
    const { Students } = this.props.drizzleState.contracts;
    const student_array = Students.get[this.state.dataKey];
    if (student_array === undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {student_array.value.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
      );
    }
  }
}

export default GetStudents;
