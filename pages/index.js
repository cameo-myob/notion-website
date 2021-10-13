const Home = ({quote}) => {
  return <p>{JSON.stringify(quote)}</p>
}

export const getStaticProps = async () => {
  // fetch data from notion
  // create static pages

  const quote = await fetch('url')
  .then(res => res.json)

  return {
    props: {
      quote,
    }
  }
}

export default Home