import moment from "moment"
import React, { useState } from "react"

interface IData {
  url: string
  date: string
}

const withPrettyDate = (Component: React.FC<{ date: string }>) => {
  return function Wrapper(props: { date: string }) {
    // return diff in hours
    const diff = (date: string) => {
      return (moment().unix() - moment(date).unix()) / 60 / 60
    }

    const myDiff = diff(props.date)
    let prettyTime = ""

    if (myDiff < 1) {
      prettyTime = "12 минут назад"
    } else if (myDiff < 24) {
      prettyTime = "5 часов назад"
    } else {
      prettyTime = `${Math.floor(myDiff / 24)} дней назад`
    }

    return <Component date={prettyTime} />
  }
}

const DateTime = (props: { date: string }) => {
  return <p className="date">{props.date}</p>
}

const DateTimePretty = withPrettyDate(DateTime)

const Video = (props: IData) => {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.url} />
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props: { list: Array<IData> }): any {
  return props.list.map((item) => <Video key={item.url} url={item.url} date={item.date} />)
}

const Time = () => {
  const [list, setList] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-01-25 11:58:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-01-23 11:58:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-01-22 11:58:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-01-21 11:58:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-01-19 11:58:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2021-01-19 11:58:00",
    },
  ])

  return <VideoList list={list} />
}

export default Time
