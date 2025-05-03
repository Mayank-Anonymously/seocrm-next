import React from "react";

const FormInput = (props: any) => {
  return (
    <>
      <input
        type={props.inpType}
        className="form-control"
        id={props.inpId}
        placeholder={props.inpPlaceholder}
        name={props.inpName}
        onChange={props.inpchange}
        onBlur={props.inpblur}
        value={props.inpvalue}
        // controlId={props.inpcontrol}
        disabled={props.disabled}
        style={props.inpstyle}
        max={props.max}
        min={props.min}
      />
    </>
  );
};

export default FormInput;
