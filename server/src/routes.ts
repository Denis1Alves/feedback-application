import express from 'express';
import { NodeMailerAdapter } from './adapters/nodeMailerAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/PrimaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCases/Feedback/submitFeedbackUseCase';

export const routes = express.Router();



routes.post('/feedback', async (req,res)=>{
  const {type ,comment, screenshot } = req.body;
  
  const prismaRepository = new PrismaFeedbackRepository();
  const nodemailerAdapter = new NodeMailerAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaRepository, nodemailerAdapter); 
  await submitFeedbackUseCase.execute({type,comment, screenshot});


  res.status(201).send();
});