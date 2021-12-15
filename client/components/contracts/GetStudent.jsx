import React, { Component } from "react";

class GetStudents extends React.Component {
  state = {
    dataKey: null,
    data: undefined,
    events: undefined,
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Students;
    const dataKey = contract.methods["get"].cacheCall();
    this.setState({ dataKey });
    this.getPastEvents();
  }

  getPastEvents = async () => {
    const web3 = this.props.drizzle.web3;
    const contract = this.props.drizzle.contracts.Students;
    const yourContractWeb3 = new web3.eth.Contract(
      contract.abi,
      contract.address
    );
    const data = await yourContractWeb3.getPastEvents("Student", {
      fromBlock: 0,
      toBlock: "latest",
    });
    this.setState({ events: data });
  };
  render() {
    // const { Students } = this.props.drizzleState.contracts;
    // const student_array = Students.get[this.state.dataKey];
    if (this.state.events === undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {this.state.events.map((item, index) => {
            return <div key={index}>{item.returnValues._value}</div>;
          })}
        </div>
      );
    }
  }
}

export default GetStudents;
