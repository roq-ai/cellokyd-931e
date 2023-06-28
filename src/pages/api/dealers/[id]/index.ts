import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dealerValidationSchema } from 'validationSchema/dealers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.dealer
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDealerById();
    case 'PUT':
      return updateDealerById();
    case 'DELETE':
      return deleteDealerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDealerById() {
    const data = await prisma.dealer.findFirst(convertQueryToPrismaUtil(req.query, 'dealer'));
    return res.status(200).json(data);
  }

  async function updateDealerById() {
    await dealerValidationSchema.validate(req.body);
    const data = await prisma.dealer.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDealerById() {
    const data = await prisma.dealer.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
