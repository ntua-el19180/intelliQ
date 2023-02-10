function Modal (props) {

    function cancelHandler(){
        props.onCancel();
    }
    function confirmHandler(){
        props.onConfirm();
    }

    return (
    <div className="modal">
        <p>Are you sure?</p>
        <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
        <buttom className="btn" onClick={confirmHandler}>Confirm</buttom>
    </div>
    );
}

export default Modal;