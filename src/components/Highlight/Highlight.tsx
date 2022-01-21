import React, { useState } from "react"

interface IData {
  type: string
  views: number
  title?: string
  url?: string
}

const withStatus = (
  Component: React.FC<IData>,
  New: React.FC<{ children: React.ReactNode }>,
  Popular: React.FC<{ children: React.ReactNode }>
) => {
  return function Wrapper(props: IData) {
    return props.views < 100 ? (
      <New>
        <Component {...props} />
      </New>
    ) : props.views > 1000 ? (
      <Popular>
        <Component {...props} />
      </Popular>
    ) : (
      <Component {...props} />
    )
  }
}

const New = (props: { children: React.ReactNode }) => {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
}

const Popular = (props: { children: React.ReactNode }) => {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
}

const Article = (props: IData) => {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
}

const Video = (props: IData) => {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={props.url || props.title}
      />
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
}

const ArticleWithStatus = withStatus(Article, New, Popular)
const VideoWithStatus = withStatus(Video, New, Popular)

function List(props: { list: Array<IData> }): any {
  return props.list.map((item) => {
    switch (item.type) {
      case "video":
        return <VideoWithStatus key={item.url || item.title} {...item} />

      case "article":
        return <ArticleWithStatus key={item.url || item.title} {...item} />

      default:
        return ""
    }
  })
}

const Highlight = () => {
  const [list, setList] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ])

  return <List list={list} />
}

Video.defaultProps = {
  url: "",
  title: "",
}

Article.defaultProps = {
  title: "",
  url: "",
}

export default Highlight
