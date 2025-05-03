import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Col, Form } from "react-bootstrap";

const RoleForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      // Clear the name error when the user starts typing again
      setNameError("");
    }
  };

  const handleSubmitMembership = (e: any) => {
    e.preventDefault();
    if (!name) {
      setNameError("Name is required");
      return;
    }

    // Additional logic for submitting form
    // ...
  };

  return (
    <div className="container-fluid">
      <Card>
        <Form
          id="contactlist-form"
          autoComplete="off"
          className="needs-formik p-2"
          noValidate
          onSubmit={handleSubmitMembership}
        >
          <div className="d-flex flex-column gap-3">
            <Col>
              <div>
                <Form.Label htmlFor="name" className="form-label">
                  Title
                </Form.Label>
                <Form.Control
                  name="name"
                  id="name"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  placeholder="Enter Role..."
                  type="text"
                  onChange={handleChange}
                  value={name}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>
            </Col>
            {/* Render other fields */}
          </div>
          <Button variant="secondary" type="submit">
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RoleForm;
