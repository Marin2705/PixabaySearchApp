import PicContainer from '../PicContainer'
import Loader from '../Loader'

function Pictures(props) {
  return (
    <>
      {!props.loaded && props.showLoader && <Loader />}
      <main
        className={`pictures ${props.disappear ? 'opacity0' : 'opacity1'}`}
        onLoad={(e) =>
          props.waitBeforeCallback(function () {
            props.setLoaded(true)
          }, 1000)
        }
        id="pictures"
      >
        {props.pictures.map((picture, i) => {
          return (
            <PicContainer
              loaded={props.loaded}
              searchLogo={props.searchLogo}
              pageUrl={picture.pageUrl}
              imgUrl={picture.imgUrl}
              key={i}
            />
          )
        })}
      </main>
    </>
  )
}

export default Pictures
