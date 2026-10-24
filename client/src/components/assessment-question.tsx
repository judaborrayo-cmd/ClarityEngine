import type { Ref } from "react";
import { Button } from "@/components/ui/button";
import { assessmentSections } from "@/lib/assessment-copy";
import { questionDisplay } from "@shared/marketing-clarity-audit/question-display";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";
import { questionnaire, type AnswerValue } from "@shared/marketing-clarity-audit/scoring";

type Props = {
  question: (typeof questionnaire.questions)[number];
  selected?: AnswerValue;
  busy?: boolean;
  position: number;
  note?: string;
  error?: string;
  canContinue?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
  onAnswer: (value: AnswerValue) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function AssessmentQuestion({ question, selected, busy, position, note, error, canContinue, titleRef, onAnswer, onContinue, onBack }: Props) {
  return (
  <section
    style={sectionStyle(question.sectionId)}
    className="assessment-question rounded-2xl border border-gray-200 p-5 sm:p-8"
  >
    <p className="text-sm" style={{ color: "var(--section-color)" }}>
      {assessmentSections[question.sectionId]?.title}
    </p>
    <p className="mt-2 text-sm text-muted-foreground">
      {assessmentSections[question.sectionId]?.description}
    </p>
    <h2
      ref={titleRef}
      tabIndex={-1}
      className="mt-4 max-w-3xl text-xl font-semibold outline-none sm:text-2xl"
    >
      {questionDisplay(question)}
    </h2>
    {"helperText" in question && (
      <p className="mt-3 text-sm">{question.helperText}</p>
    )}
    <fieldset className="mt-6 space-y-3" disabled={busy}>
      <legend className="sr-only">Choose your answer</legend>
      {question.options.map((option) => (
        <label
          key={option.value}
          className={`assessment-answer flex min-h-12 cursor-pointer gap-3 rounded-xl border p-4 focus-within:ring-2 focus-within:ring-primary ${option.value === selected ? "border-primary bg-violet-50" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name={question.id}
            value={option.value}
            checked={option.value === selected}
            onChange={() => onAnswer(option.value as AnswerValue)}
            className="mt-1 shrink-0 accent-violet-600"
          />
          <span className="max-w-3xl">{option.text}</span>
        </label>
      ))}
    </fieldset>
    {note && (
      <aside
        role="status"
        className="assessment-insight mt-5 rounded-xl bg-green-50 p-4"
      >
        <h3 className="font-semibold">Clarity Insight</h3>
        <p className="mt-2">{note}</p>
        <Button className="mt-3" onClick={onContinue}>
          Continue
        </Button>
      </aside>
    )}
    <div className="assessment-navigation mt-6 flex justify-between">
      <Button
        variant="outline"
        disabled={position === 0 || busy}
        onClick={onBack}
      >
        Back
      </Button>
      {canContinue && !note && !error && (
        <Button disabled={busy} onClick={onContinue}>
          Continue
        </Button>
      )}
    </div>
  </section>
  );
}
