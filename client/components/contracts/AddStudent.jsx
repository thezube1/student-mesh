import React, { Component } from "react";

class AddStudent extends React.Component {
  state = {
    text: "",
    stackId: null,
  };

  setValue = (value) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Students;
    const stackId = contract.methods["add"].cacheSend(value);
    this.setState({ stackId });
  };

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    return `Transaction status: ${
      transactions[txHash] && transactions[txHash].status
    }`;
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button
          className="button"
          onClick={() => this.setValue(this.state.text)}
        >
          Add
        </button>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default AddStudent;
