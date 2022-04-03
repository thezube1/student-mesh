import ColumnsSVG from "./ColumnsSVG";
import CardsSVG from "./CardsSVG";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLayout } from "../../redux/reducers/layoutReducer";

function ChangeView() {
  const layout = useSelector((state) => state.layout.layout);
  console.log(layout);
  const dispatch = useDispatch();
  return (
    <div id="change-view-wrapper">
      <button
        className="change-view-item"
        onClick={() => dispatch(setLayout("card"))}
        style={{ backgroundColor: layout === "card" ? "#745cff" : "#151515" }}
      >
        <CardsSVG />
      </button>
      <button
        onClick={() => dispatch(setLayout("list"))}
        className="change-view-item"
        style={{ backgroundColor: layout === "list" ? "#745cff" : "#151515" }}
      >
        <ColumnsSVG />
      </button>
    </div>
  );
}

export default ChangeView;
