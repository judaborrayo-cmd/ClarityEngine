"""Extract canonical questionnaire copy without editorial transformations."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = (root / 'docs/marketing-clarity-audit-v1-spec.md').read_text()
questionnaire = source.split('## 7.')[1].split('## 8.')[0]
weights = dict(re.findall(r'\b((?:ML|O|A|M|C|T)\d)=(\d+\.\d+)', source.split('### Question weights')[1].split('### Severity')[0]))
sections = []
questions = []
for section in re.split(r'### Section ', questionnaire)[1:]:
    number, name = re.match(r'(\d) of 6: ([^\n]+)', section).groups()
    introduction, *blocks = re.split(r'#### ', section)
    sections.append({'id': int(number), 'name': name, 'title': re.search(r'\*\*(.*?)\*\*', introduction).group(1), 'description': introduction.split('**\n\n')[1].split('\n\n')[0], 'timeCue': re.search(r'\n\*([^*]+)\*', introduction).group(1)})
    for block in blocks:
        question_id, label = re.match(r'(\w+)\. ([^\n]+)', block).groups()
        prompt = re.search(r'\n\*\*(.*?)\*\*', block).group(1)
        options = [{'value': value, 'text': text, 'score': 5 - index} for index, (value, text) in enumerate(re.findall(r'- \*\*([A-E])\.\*\* ([^\n]+)', block))]
        helper = re.search(r'\n_([^\n]+)_', block)
        note = re.search(r'\*\*Triggered teaching note \(selected weaker answers only\):\*\* ([^\n]+)', block)
        questions.append({'id': question_id, 'sectionId': int(number), 'order': len(questions), 'label': label, 'prompt': prompt, 'weight': float(weights[question_id]), 'options': options, **({'helperText': helper.group(1)} if helper else {}), **({'teachingNote': note.group(1)} if note else {})})
assert len(questions) == 35 and len(sections) == 6
assert all(len(q['options']) == 5 for q in questions)
flag_source = source.split('## 9.')[1].split('## 10.')[0]
for question in questions:
    line = re.search(r'- \*\*' + question['id'] + r' [^\n]+', flag_source).group(0)
    modifiers = line.split('Confidence modifiers:')[1] if 'Confidence modifiers:' in line else ''
    for option in question['options']:
        flag = re.search(option['value'] + r': ([A-Z_]+):(none|opportunity|major|critical)', line)
        modifier = re.search(option['value'] + r': (-\d+)', modifiers)
        if flag:
            option['flag'] = {'id': flag.group(1), 'severity': flag.group(2)}
        if modifier:
            option['confidenceModifier'] = int(modifier.group(1))
output = root / 'shared/marketing-clarity-audit/questionnaire.json'
output.write_text(json.dumps({'version': '1.0.0', 'sections': sections, 'questions': questions}, ensure_ascii=False, indent=2) + '\n')

patterns = []
for block in re.split(r'### ', source.split('## 12.')[1].split('## 13.')[0])[1:]:
    pattern_id, title = re.match(r'(P\d+) — ([^\n]+)', block).groups()
    fields = dict(re.findall(r'- \*\*([^*]+):\*\* ([^\n]+)', block))
    patterns.append({'id': pattern_id, 'title': title, 'triggerDescription': fields['Trigger'], 'primaryConstraint': fields['Primary constraint'], 'recommendationIds': fields['Recommendations'].split(', '), 'deprioritizedActions': fields['Do Not Prioritize Yet'].split(', '), 'kpiGuidance': fields['KPI bundle'], 'caseFormat': fields['Case format'], 'workSession': fields['Work Session'], 'aiAccelerator': fields['AI Accelerator'], 'planPhases': fields['30-day plan'].split(' → ')})

recommendations = []
for action_id, category, title, description in re.findall(r'- \*\*([A-Z]+_\d+) · ([^·]+) · ([^*]+)\*\* ([^\n]+)', source.split('## 13.')[1].split('## 14.')[0]):
    recommendations.append({'id': action_id, 'category': category.strip(), 'title': title, 'whatToDo': description})

work_sessions = []
for block in re.split(r'#### ', source.split('### Work Session prompt bank')[1].split('## 19.')[0])[1:]:
    name = block.split('\n')[0]
    work_sessions.append({'section': name, 'prompts': re.findall(r'^- ([^\n]+)', block, re.M)})

cases = []
for block in re.split(r'### ', source.split('## 19.')[1].split('## 20.')[0])[1:]:
    case_id, title = re.match(r'(CASE_\w+) — ([^\n]+)', block).groups()
    fields = dict(re.findall(r'- \*\*([^*]+):\*\* ([^\n]+)', block))
    cases.append({'id': case_id, 'title': title, 'industry': fields['Industry'], 'businessModel': fields['Business model'], 'format': fields['Format'], 'goal': fields['Goal'], 'situation': fields['Situation'], 'diagnosis': fields['Diagnosis'], 'intervention': fields['Intervention'], 'lesson': fields['Strategic lesson'], 'evidence': fields['Evidence'], 'applicability': fields['Applicability'].split(', ')})

assert len(patterns) == 15 and len(recommendations) == 48 and len(cases) == 10
assert len(work_sessions) == 6
known_actions = {action['id'] for action in recommendations}
assert all(action in known_actions or action.startswith('DYNAMIC_UPSTREAM_') for pattern in patterns for action in pattern['recommendationIds'])
(output.parent / 'report-content.json').write_text(json.dumps({'version': '1.0.0', 'product': {'productId': 'marketing-clarity-audit', 'name': 'The $27 Marketing Clarity Audit', 'subtitle': 'A Clarity Engine™ Diagnostic', 'tagline': "See what's working. Find what's holding you back. Know what to do next.", 'priceCents': 2700, 'estimatedMinutes': [12, 18]}, 'patterns': patterns, 'recommendations': recommendations, 'workSessions': work_sessions, 'cases': cases}, ensure_ascii=False, indent=2) + '\n')
