import React from 'react'

import Modal from 'react-bootstrap/Modal';

export default function ModalComponet({show, handleClose, tittle, tittleSave, children, handleToSendForm}){
	return(
		<Modal show={show} onHide={handleClose}>
	        <div className="fw-bold text-center mt-2"><h2>{tittle}</h2></div>
	        <hr />
	        <Modal.Body>{children}</Modal.Body>
	        <Modal.Footer>
	          <button className='btn btn-secondary' onClick={handleClose}>
	            Cerrar
	          </button>
	          <button className="btn btn_save" onClick={handleToSendForm}>
	            {tittleSave}
	          </button>
	        </Modal.Footer>
	    </Modal>
	)
}