import { prisma } from "../../prisma";
import { FeedbackCreateData, IFeedbackRepository } from "../IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create({type,comment, screenshot } : FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data:{
        type,
        comment,
        screenshot,
      }
    });
  }
}