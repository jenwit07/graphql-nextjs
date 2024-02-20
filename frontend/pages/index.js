import { gql, useQuery } from '@apollo/client';

const GET_NEWS = gql`
  query GetNews {
    getNews {
      id
      title
      content
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_NEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>News</h1>
      {data.getNews.map(({ id, title, content }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}
