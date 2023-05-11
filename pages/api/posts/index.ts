import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    const result = await Posts.create(req.body);

    res.status(200).json(result);
  }

  if (method === 'PUT') {
    const { _id, ...rest } = req.body;

    await Posts.updateOne({ _id: new ObjectId(_id) }, rest);

    res.status(200).end();
  }

  if (method === 'DELETE') {
    await Posts.deleteOne({ _id: new ObjectId(req.body._id) });

    // if (deletedCount === 1)
    res.status(200).end();
    // TODO - 삭제 제대로 안 됐을 때 에러 처리
  }

  // TODO - 수정 API
}
