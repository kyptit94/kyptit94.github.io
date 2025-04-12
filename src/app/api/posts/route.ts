import { getBlogPosts } from '@/lib/blog';
import { NextResponse } from 'next/server';

const POSTS_PER_PAGE = 6;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const posts = await getBlogPosts();
  
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);
  
  return NextResponse.json(paginatedPosts);
}
