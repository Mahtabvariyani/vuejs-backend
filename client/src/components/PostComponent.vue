<template>
  <div class="container">
    <h1>lastedt Post</h1>
    <div class="create-post">
      <label for="create-post">Say Something</label>
      <input
        type="text"
        name="description"
        id="create-post"
        v-model="description"
        placeholder="create a post"
      />
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr />
    <p class="error" v-if="error">
      {{ error }}
    </p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}

        <p class="text">
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      description: "",
    };
  },
  async created() {
    try {
      const posts = await PostService.getPosts();
      this.posts = posts;
    } catch (err) {
      console.log(err);
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.description);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid blue;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 13px;
}
</style>
