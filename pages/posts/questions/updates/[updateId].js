import React from "react";
// import UpdateQuestionForm from "../../../../components/questions/question-update.form";

import UpdateQuestionForm from "../../../../components/questions/question-update-form";
import EssayUpdateQuestionForm from "../../../../components/questions/essay-quest-update-form";
import { useRouter } from "next/router";

export default function ShowQuestionUpdate() {
  //const router = useRouter();
  const { query } = useRouter();
  //const { questionType } = router.query;
  console.log(query.questionType, "update---page");
  return (
    <div>
      {query.questionType === "multi-choice" ? (
        <UpdateQuestionForm />
      ) : (
        <EssayUpdateQuestionForm />
      )}
    </div>
  );
}
