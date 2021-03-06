import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackTypes, feedbackTypes } from "..";
import { api } from "../../../libs/api";
import { CloseButtom } from "../../CloseButtom";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackTypes;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({feedbackType, onRestartFeedback, onFeedbackSent} : FeedbackContentStepProps){
  const feedbackTypeData = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);


  async function handleSubmitFeeback(event: FormEvent){
    event.preventDefault();
    setIsSendingFeedback(true);
    await api.post('/feedback', {
      type: feedbackType,
      comment,
      screenshot
    });
    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return(
  <>
    <header>

      <button 
        type="button" 
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        onClick={onRestartFeedback}
      >
        <ArrowLeft weight="bold" className="w-4 h-4"/>
      </button>

      <span className="text-xl flex items-center gap-2">
        <img 
          src={feedbackTypeData.image.source} 
          alt={feedbackTypeData.image.alt}
          className="w-6 h-6"
        />
        {feedbackTypeData.title}
      </span>
      <CloseButtom/>
    </header>

    <form onSubmit={handleSubmitFeeback} className="my-4 w-full">
      <textarea 
        onChange={event => setComment(event.target.value)}
        className="min-w-[304px] w-full min-h-[112px] text-sm 
        placeholder-zinc-400 text-zinc-100 border-zinc-600 
        bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500
        focus:ring-1 resize-none focus:outline-none 
        scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        placeholder="Conte com detalhes o que est?? acontecendo..."
      />

      <footer className="flex gap-2 mt-2">
        <ScreenshotButton 
          screenshot={screenshot}
          onScreenshotTook={setScreenshot} 
        />
        
        <button
          type="submit"
          disabled={comment.length === 0 || isSendingFeedback}
          className="p-2 bg-brand-500 rounded-sm border-transparent flex-1
          flex justify-center items-center text-sm hover:bg-brand-300
          transition-colors focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus: ring-offset-zinc-900
          focus:ring-brand-500
          disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
        </button>
      </footer>
    </form>
  </>
  );
}