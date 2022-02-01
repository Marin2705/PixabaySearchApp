function PicContainer(props) {
  return (
    <div className={`picContainer ${props.loaded ? '' : 'displaynone'}`}>
      <a href={props.pageUrl} target="_blank" rel="noreferrer">
        <img src={props.searchLogo} alt="" className="searchLogoOnImage" />
        <img src={props.imgUrl} alt="" className="pic" />
      </a>
    </div>
  )
}

export default PicContainer
