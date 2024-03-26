import { PostDto } from "@/app/types/posts";
import { getPosts, updatePosts } from "./utils";

export async function GET() {
  const posts = getPosts();

  return Response.json(posts);
}

export async function POST(request: Request) {
  const body: PostDto = await request.json();

  const posts = getPosts();
  const lastId = posts[posts.length - 1].id || 0;
  const newPost = {
    ...body,
    id: lastId + 1,
  };
  updatePosts([...posts, newPost]);

  return Response.json(newPost);
}
