import { useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegistered } from "../../redux/reducers/contractReducer";

function SetupForm() {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const submitForm = async () => {
    if (firstName !== "" || lastName !== "") {
      setError(false);
      const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
      const accounts = await web3.eth.getAccounts();

      const studentContract = new web3.eth.Contract(
        STUDENTS_ABI,
        STUDENTS_ADDRESS
      );
      await studentContract.methods
        .add(firstName, lastName)
        .send({ from: accounts[0] });
      dispatch(setRegistered(true));
    } else {
      setError(true);
    }
  };

  return (
    <div id="account-signup">
      <div className="title" style={{ fontSize: 40 }}>
        Set up account
      </div>
      {error ? <div className="form-error">All fields required</div> : false}
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={() => submitForm()}
        className="button"
        style={{ marginTop: 20 }}
      >
        Submit
      </button>
    </div>
  );
}

export default SetupForm;
