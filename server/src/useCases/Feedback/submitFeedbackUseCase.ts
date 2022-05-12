import { IEmailAdapter } from "../../adapters/mail/ImailAdapter";
import { IFeedbackRepository } from "../../repositories/IFeedbackRepository";

interface SubmitFeedbackUseCaseData {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {

  constructor(
    private IfeedbackRepository: IFeedbackRepository
    , private IemailAdapter: IEmailAdapter
  ) {
  
  }

  async execute(requestData: SubmitFeedbackUseCaseData): Promise<void> {
    const {type, comment, screenshot} = requestData;
    
    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('Comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format');
    }

    await this.IfeedbackRepository.create({type, comment, screenshot});
    this.IemailAdapter.sendMail({
      subject: `Novo Feedback`, 
      body:[
        `<div style="font-family: sans-serif; font-size: 16px; color:#111">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
		    `<img src='${screenshot}' style='max-width: 35%'/>`,
        `</div>`,
      ].join('\n')
    });
  }
}