import json,pathlib,subprocess,re
p=pathlib.Path('output/assessment-combined-integration')
a=json.loads((p/'analytics-private-transport-check.json').read_text());c=json.loads((p/'completion-private-transport-check.json').read_text())
assert any(x.get('event')=='purchase' and x.get('status')==204 for x in a['traffic'])
assert any(x.get('event')=='assessment_complete' and x.get('status')==204 for x in c['traffic'])
assert not any(x.get('status') and x.get('privateTokenInRequest') for x in a['traffic'])
assert not any(x.get('containsPrivateToken') or x.get('containsEmail') for x in c['traffic'])
assert not any(x.get('status') and '/measurement/conversion' in x.get('path','') for x in a['traffic']+c['traffic'])
checks=[]
for label in ['full','discount']:
 text=subprocess.check_output(['pdftotext',str(p/f'{label}-report.pdf'),'-']).decode();text=re.sub(r'\s+',' ',text)
 assert 'gather the inputs for a lightweight report' in text.lower()
 assert not re.search(r'review and agree the improvement|prerequisites do not change|score-ordered|reorder the pillars|\bML[1-6]\b',text)
 assert '48/100' in text and '70.4/100' in text
 checks.append({'case':label,'concreteHeading':True,'internalRankingCopyAbsent':True,'scoresUnchanged':True})
(p/'final-independent-checks.json').write_text(json.dumps({'pass':True,'GA4PurchaseCollection204':True,'GA4CompletionCollection204':True,'privateTokenInAcknowledgedRequests':False,'emailInInspectedCompletionRequest':False,'automaticGoogleAdvertisingResponseOnPrivatePage':False,'propertyProcessingConfirmed':False,'adAttributionConfirmed':False,'pdfCopy':checks},indent=2))
print('PASS: actual collection acknowledgements are separate, inspected requests are sanitized, private advertising transport is blocked, and PDF copy/scores match.')
