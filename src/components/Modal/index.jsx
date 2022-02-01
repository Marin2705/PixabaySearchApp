function Modal(props) {
  return (
    <div
      className={`modal ${props.animateModal ? 'opacity1' : 'opacity0'} ${
        !props.showModal ? 'displaynone' : null
      }`}
      onClick={() => {
        props.modalOff()
      }}
    >
      <div className="modalContainer">
        <svg viewBox="0 0 77 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M43 49L43 50.5L43 50.5L43 49ZM12 18L10.5 18L10.5 18L12 18ZM13.0607 0.939331C12.4749 0.353545 11.5251 0.353544 10.9393 0.939331L1.39341 10.4853C0.807619 11.0711 0.807619 12.0208 1.39341 12.6066C1.97919 13.1924 2.92894 13.1924 3.51473 12.6066L12 4.12131L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939331ZM77 47.5L43 47.5L43 50.5L77 50.5L77 47.5ZM13.5 18L13.5 1.99999L10.5 1.99999L10.5 18L13.5 18ZM43 47.5C26.7076 47.5 13.5 34.2924 13.5 18L10.5 18C10.5 35.9492 25.0507 50.5 43 50.5V47.5Z"
            fill="black"
          />
        </svg>

        <p>Type in keywords to find free images</p>
      </div>
    </div>
  )
}

export default Modal
