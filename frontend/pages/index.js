import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

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

const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteNews(id: $id) {
      id
    }
  }
`;

const UPDATE_NEWS = gql`
  mutation UpdateNews($id: ID!, $title: String!, $content: String!) {
    updateNews(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_NEWS);
  const [addNews] = useMutation(ADD_NEWS);
  const [deleteNews] = useMutation( DELETE_NEWS );
  const [updateNews] = useMutation(UPDATE_NEWS);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    await addNews({ variables: { title, content } });
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteNews({ variables: { id } });
    refetch();
  };

  const handleUpdate = async ( id ) => {
    console.log( { id, editTitle, editContent } );
    await updateNews({ variables: { id, title: editTitle, content: editContent } });
    setEditId(null);
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>News</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='title' placeholder='Title' required />
        <textarea name='content' placeholder='Content' required />
        <button type='submit'>Add News</button>
      </form>
      {data.getNews.map(({ id, title, content }) => (
        <div key={id}>
          {editId === id ? (
            <>
              <input
                key={id+1}
                type='text'
                value={editTitle}
                onChange={( e ) => setEditTitle( e.target.value )}
              />
              <textarea
                key={id}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(id)}>Save</button>
            </>
          ) : (
            <>
              <h2>{title}</h2>
              <p>{content}</p>
              <button onClick={() => handleDelete(id)}>Delete</button>
              <button
                onClick={() => {
                  setEditId(id);
                  setEditTitle(title);
                  setEditContent(content);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
