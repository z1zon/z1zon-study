import { PostDto } from "@/app/types/posts";
import { getPosts, updatePosts } from "../utils";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body: PostDto = await request.json();

  const posts = getPosts();
  const newPosts = posts.map((post) =>
    post.id === id
      ? {
          ...post,
          ...body,
        }
      : post
  );
  updatePosts(newPosts);

  return Response.json({ ...body });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);
  updatePosts(filteredPosts);

  return Response.json({});
}
