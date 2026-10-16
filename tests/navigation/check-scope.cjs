// Credential-free source-boundary audit. Reads Git metadata and navigation files only.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const expected='01464ba463545f7efe10d7597be918c93b4cf910';
const runtime=['client/src/components/site-navigation.tsx','client/src/components/navigation-config.ts','client/src/components/site-navigation.css','client/src/components/legacy-flow-navigation.tsx'];
const split=s=>s?s.split('\n'):[];
const tracked=split(git('diff','--name-only',expected));
const staged=split(git('diff','--cached','--name-only'));
const untracked=split(git('ls-files','--others','--exclude-standard'));
const unique=Array.from(new Set([...tracked,...staged,...untracked])).sort();
const classify=p=>runtime.includes(p)?'navigation-runtime':/^tests\/navigation\/(navigation\.spec\.ts|playwright\.config\.ts|check-scope\.cjs)$/.test(p)?'isolated-navigation-test':/^docs\/navigation\/[a-z0-9-]+\.md$/.test(p)?'nonsecret-review-document':/^output\/(navigation-integration|navigation-review|navigation-safety)\//.test(p)?'local-evidence-not-runtime':null;
const entries=unique.map(p=>({path:p,classification:classify(p)}));
const forbidden=entries.filter(e=>!e.classification||/(^|\/)(\.env[^/]*|auth\.json|credentials[^/]*|secret[^/]*)(\/|$)/i.test(e.path));
const baselineHeader=execFileSync('git',['show',expected+':client/src/components/site-navigation.tsx']);
const compatibilityMatches=baselineHeader.equals(fs.readFileSync(runtime[3]));
const imports=fs.readFileSync(runtime[0],'utf8').split('\n').filter(l=>l.startsWith('import '));
const allRuntimePresent=runtime.every(p=>fs.existsSync(p));
let baselineAncestor=false;try{execFileSync('git',['merge-base','--is-ancestor',expected,'HEAD']);baselineAncestor=true;}catch{}
const result={allRuntimePresent,baseline:git('rev-parse','HEAD'),expected,tracked,staged,entries,forbidden,compatibilityMatches,imports,pass:baselineAncestor&&!forbidden.length&&compatibilityMatches&&allRuntimePresent};
fs.mkdirSync('output/navigation-safety',{recursive:true});fs.writeFileSync('output/navigation-safety/changed-files.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({pass:result.pass,tracked,staged,runtime:entries.filter(e=>e.classification==='navigation-runtime').map(e=>e.path),forbidden,compatibilityMatches,untrackedEvidenceCount:entries.filter(e=>e.classification==='local-evidence-not-runtime').length}));if(!result.pass)process.exitCode=1;
