import  Axios  from "axios";
const url = "api/posts/";

class PostService {
  // Get Post
  static getPosts() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await Axios.get(url);
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }))
          );
        } catch (error) {
          reject(error);
          console.log("error", error);
        }
      })();
    });
  }

  // Create Posts
  static insertPost(description) {
    return Axios.post(url, {
        description,
    });
  }

  // Delete Posts
  static deletePost(id) {
    return Axios.delete(`${url}${id}`);
  }
}

export default PostService;
