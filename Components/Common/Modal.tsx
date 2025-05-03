import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Custom_Modal = (props: any) => {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={props.onHide}
      fullscreen={props.fullscreen}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>{props.footer}</Modal.Footer>
    </Modal>
  );
};

export default Custom_Modal;
