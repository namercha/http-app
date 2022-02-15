import React, { Component } from 'react';
import httpService from './services/httpService';
import './App.css';
import config from './config.json';

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // const promise = httpService.get('https://jsonplaceholder.typicode.com/posts');
    // const response = await promise;
    const { data: posts } = await httpService.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    console.log('Add');
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await httpService.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'UPDATED';
    // For PUT method, have to send entire post object
    await httpService.put(config.apiEndpoint + '/' + post.id, post);

    // For POST method, have to send only the property of the object being updated
    // httpService.patch(config.apiEndpoint + "/" + post.id, {title: post.title});

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    // Update the UI first before making the HTTP call
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      // Make the http call
      await httpService.delete(config.apiEndpoint + '/' + post.id);
    } catch (ex) {
      // Expected errors: 404 not found, 400 bad request - CLIENT ERRORS
      //  - Display a specific error message
      if (ex.response && ex.response.status === 404)
        alert('This post has already been deleted.');
      // Unexpected errors: network down, server down, database down
      //  - Log these errors
      //  - Display a generic and friendly error message

      this.setState({ originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th> Title </th> <th> Update </th> <th> Delete </th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td> {post.title} </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
