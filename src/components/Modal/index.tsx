import './index.css'

export function Modal({ children, isOpen, onClose }: any) {
   return (
    <div data-testid="modal" className={"modal "+ (isOpen ? 'd-flex' : 'd-none')}>
      <section className="modal-main">
        {children}
        <button data-testid="close-button" onClick={onClose} type="button" className='button-close'>
          X
        </button>
      </section>
    </div>
    )
}