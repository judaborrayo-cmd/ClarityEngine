import { questionDisplay } from "@shared/marketing-clarity-audit/question-display";
import {
  questionnaire,
  type Answers,
} from "@shared/marketing-clarity-audit/scoring";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";

export default function AuditAnswerReview({
  answers,
  run,
}: {
  answers: Answers;
  run: number;
}) {
  return (
    <section
      id="audit-answer-review"
      className="my-10"
      aria-labelledby="audit-answer-review-title"
    >
      <h2 id="audit-answer-review-title" className="text-2xl font-bold">
        Review My Assessment Answers
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        These are the 35 answers frozen with Report {run}. They are read-only;
        your Work Session notes and other report never change them.
      </p>
      <div className="mt-5 space-y-3">
        {questionnaire.sections.map((section) => (
          <details
            key={section.id}
            className="rounded-xl border bg-white"
            style={{
              ...sectionStyle(section.id),
              borderColor: "var(--section-border)",
            }}
          >
            <summary
              className="cursor-pointer rounded-xl px-5 py-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                color: "var(--section-color)",
                background: "var(--section-tint)",
              }}
            >
              {section.name} ·{" "}
              {
                questionnaire.questions.filter(
                  (q) => q.sectionId === section.id,
                ).length
              }{" "}
              questions
            </summary>
            <ol className="space-y-6 p-5">
              {questionnaire.questions
                .filter((q) => q.sectionId === section.id)
                .map((question) => (
                  <li key={question.id} data-question={question.id}>
                    <h3 className="font-semibold">
                      {question.order + 1}. {questionDisplay(question)}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {question.options.map((option) => {
                        const selected = answers[question.id] === option.value;
                        return (
                          <li
                            key={option.value}
                            data-selected={selected}
                            className="rounded-lg border px-4 py-3 text-sm leading-relaxed"
                            style={
                              selected
                                ? {
                                    background: "var(--section-tint)",
                                    borderColor: "var(--section-color)",
                                    color: "var(--section-color)",
                                  }
                                : { borderColor: "#e5e7eb", color: "#606873" }
                            }
                          >
                            {selected && (
                              <span className="mb-1 block text-xs font-bold">
                                Your selected answer
                              </span>
                            )}
                            {option.text}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
            </ol>
          </details>
        ))}
      </div>
    </section>
  );
}
