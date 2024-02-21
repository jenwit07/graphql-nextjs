import { gql, useQuery, useMutation } from '@apollo/client';

const GET_NEWS = gql`
  query GetNews {
    getNews {
      id
      title
      content
    }
  }
`;

const ADD_NEWS = gql`
  mutation AddNews($title: String!, $content: String!) {
    addNews(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_NEWS);
  const [addNews] = useMutation(ADD_NEWS);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    await addNews({ variables: { title, content } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>News</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        <button type="submit">Add News</button>
      </form>
      {data.getNews?.map(({ id, title, content }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}
