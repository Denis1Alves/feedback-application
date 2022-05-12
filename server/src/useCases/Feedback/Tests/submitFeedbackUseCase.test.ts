import { SubmitFeedbackUseCase } from "../submitFeedbackUseCase";

//spies = espiões. Permite saber se dentro do código uma função foi chamada ou não.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
); 

describe('Submit Feedback Use Case', () => {
  it('should be able to submit a new feedback', async () => {
  
    await expect(
      feedback.execute({
      type: 'BUG', 
      comment:'exemple Comment',
       screenshot: 'data:image/png;base64,sdgasdgsfdg'
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  });
//=========================
  it('should not be able to submit a new feedback without a type', async () => {
  
    await expect(
      feedback.execute({
      type: '', 
      comment:'exemple Comment',
       screenshot: 'data:image/png;base64,sdgasdgsfdg'
      })
    ).rejects.toThrow();
  });
  //=========================
  it('should not be able to submit a new feedback without a comment', async () => {
  
    await expect(
      feedback.execute({
      type: 'BUG', 
      comment:'',
       screenshot: 'data:image/png;base64,sdgasdgsfdg'
      })
    ).rejects.toThrow();
  });
   //=========================
   it('should not be able to submit a new feedback with an invalid screenshot', async () => {
  
    await expect(
      feedback.execute({
      type: 'BUG', 
      comment:'exemple Comment',
       screenshot: 'testt.jpg'
      })
    ).rejects.toThrow();
  });
});