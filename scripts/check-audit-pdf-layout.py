"""Verify QA fixtures after verify-audit-pdf.ts (requires pypdf)."""
from pathlib import Path
from pypdf import PdfReader
import re
for size in ('LETTER', 'A4'):
    reader = PdfReader(Path('tmp/pdfs') / f'clarity-report-{size}.pdf')
    text = '\n'.join(page.extract_text() for page in reader.pages)
    assert 'Help customers see the business outcome' in text
    assert 'Co-Create With AI' in text
    assert 'Visual before/after example coming soon' in text
    assert 'Why this is critical' in text
    assert 'Put your plan where you can see it' in text
    assert 'Validate Ideas & Accelerate Execution' in text
    assert text.count('Cut this out and keep it visible this week.') == 4
    for week in range(1, 5):
        pages = [p for p in reader.pages if re.search(rf'W\s*E\s*E\s*K\s+{week}\b', p.extract_text())]
        assert len(pages) == 1
        card_page = pages[0].extract_text()
        assert 'Objective' in card_page and 'Specific Actions' in card_page and 'Done When' in card_page
        assert 'Cut this out and keep it visible this week.' in card_page
    # Check six score values/status baselines have clear vertical separation.
    runs = []
    def visit(t, cm, tm, font, size):
        if t.strip(): runs.append((t.strip(), cm[5] + tm[5], size))
    next(page for page in reader.pages if "Six-part scorecard" in page.extract_text()).extract_text(visitor_text=visit)
    scores = [y for t,y,size in runs if size == 22 and '/ 100' in t]
    labels = [y for t,y,size in runs if t in ('Strong','Needs Attention')]
    assert len(scores) == len(labels) == 6
    for y in labels: assert min(s-y for s in scores if s > y) > 20
    # Empty printable squares are vector rectangles, not online state/text glyphs.
    ops = next(page for page in reader.pages if "Your Next 3 Moves" in page.extract_text()).get_contents().operations
    squares = [i for i, (args, op) in enumerate(ops[:-1]) if op == b'm' and len(args) == 2 and ops[i+1][1] == b'l' and len(ops[i+1][0]) == 2 and abs(float(ops[i+1][0][0])-float(args[0])-16)<.1 and abs(float(ops[i+1][0][1])-float(args[1]))<.1]
    assert len(squares) == 3, (size, len(squares))
    print(size, ': four intact cut cards, three empty boxes, clear scorecard, updated teaching copy')
