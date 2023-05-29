import dbConnect from '@/lib/mongoose';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import type { Post } from '@/models/Posts';
import Posts from '@/models/Posts';
import type { GetServerSideProps } from 'next';

const siteUrl = process.env.PRODUCTION_URL || 'https://42blog.vercel.app';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();

  const results = await Posts.find<Post>({});

  const fields = results.map(({ _id }) => ({
    loc: `${siteUrl}/posts/${_id.toString()}`,
    priority: 0.7,
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function SiteMap() {}
