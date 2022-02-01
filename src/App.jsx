import { useEffect, useState } from 'react'
import searchLogo from './assets/search.svg'
import pixabayLogo from './assets/pixabay_logo.svg'
import Pictures from './components/Pictures'
import Modal from './components/Modal'

function App() {
  const [showLoader, setShowLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [disappear, setDisappear] = useState(false)
  const [pictures, updatePictures] = useState([])
  const [loaded, setLoaded] = useState(false)

  // show / hide modal
  function modalOn() {
    setShowModal(true)
    setAnimateModal(true)
  }

  function modalOff() {
    setAnimateModal(false)
    setTimeout(() => {
      setShowModal(false)
    }, 300)
  }

  useEffect(() => {
    modalOn()
    setTimeout(() => {
      modalOff()
    }, 3000)
  }, [])

  // reveal images with opacity animation
  useEffect(() => {
    setDisappear(!loaded)
  }, [loaded])

  // fetch data from Pixabay and update state with new pictures
  async function fetchImages(encodedQuery) {
    let response = await fetch(
      `https://pixabay.com/api/?key=25498619-147f47fea6f4aa08f6c22f598&q=${encodedQuery}&image_type=photo`
    )

    if (!response.ok) {
      throw new Error(
        'Looks like there was a problem. Status Code: ' + response.status
      )
    }

    let data = await response.json()

    let urlList = []
    data.hits.forEach((hit) => {
      urlList.push({ imgUrl: hit.webformatURL, pageUrl: hit.pageURL })
    })
    setLoaded(false)
    setShowLoader(true)
    setTimeout(() => {
      updatePictures(urlList)
    }, 300)
  }

  // encode the query and get images url from Pixabay
  function search(query) {
    const encodedQuery = encodeURIComponent(query)
    fetchImages(encodedQuery).catch((e) => {
      console.log(
        'Il y a eu un problème avec votre opération de récupération : ' +
          e.message
      )
    })
  }

  // to prevent too many requests, wait for the user to have completed writing his search (500ms after the last KeyUp event) before launching a search on Pixabay
  let waitBeforeCallback = (function () {
    let timer = 0
    return function (doSearch, ms) {
      clearTimeout(timer)
      timer = setTimeout(doSearch, ms)
    }
  })()

  return (
    <>
      <Modal
        modalOff={modalOff}
        modalOn={modalOn}
        showModal={showModal}
        animateModal={animateModal}
        waitBeforeCallback={waitBeforeCallback}
      />
      <div>
        <h1>📸 Pixabay Search App 🏞</h1>
        <div className="searchContainer">
          <img src={searchLogo} alt="" />
          <input
            onKeyUp={(e) =>
              waitBeforeCallback(function () {
                search(e.target.value)
              }, 500)
            }
            type="text"
            name="searchbar"
            placeholder="Search free images with keywords"
            className="searchbar"
            id="searchbar"
          />
        </div>
        <Pictures
          showLoader={showLoader}
          setShowLoader={setShowLoader}
          pictures={pictures}
          disappear={disappear}
          searchLogo={searchLogo}
          waitBeforeCallback={waitBeforeCallback}
          loaded={loaded}
          setLoaded={setLoaded}
        />
        <footer>
          <p>
            <a href="https://pixabay.com/">
              Free images brought to you by
              <img src={pixabayLogo} alt="" />
            </a>
          </p>
          <p>
            App made by{' '}
            <a
              href="https://www.linkedin.com/in/marin-bouanchaud/"
              className="lkinLink"
            >
              Marin Bouanchaud
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
