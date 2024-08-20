'use client';

import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { addComment } from "@/model/action/postAction";
import { PostComment } from "@/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CommentNew({ id }: { id: string } ) {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<PostComment>();

  const handleAdd = (commentObj: PostComment) => {
    addComment(id, commentObj);
    router.refresh();
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={ handleSubmit(handleAdd) }>
        <input type="hidden" name="id" value={ id } />
        <div className="mb-4">
          <textarea
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            { ...register('content', {
              required: '내용은 필수입니다.',
              minLength: {
                value: 2,
                message: '2글자 이상 입력하세요.'
              }
            }) }></textarea>
            
            <InputError target={ errors.content } />
            
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}