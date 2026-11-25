// Free-tier integration foundation. No paid services or credentials embedded.
const reply=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...headers}});
export function validateSearch(q){
 if(!q||!kinds.includes(q.service)||typeof q.destination!=="string"||!q.destination.trim()||q.destination.length>180)return false;
 if(q.service==="transfer"){
  if(typeof q.from!=="string"||!q.from.trim()||q.from.length>180||q.from.trim().toLowerCase()===q.destination.trim().toLowerCase())return false;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(q.date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(q.time)||!Number.isFinite(Date.parse(q.date+"T"+q.time+"Z")))return false;
  if(!Number.isInteger(q.people)||q.people<1||q.people>50||!Number.isInteger(q.bags)||q.bags<0||q.bags>50)return false;
 }
 return true;
}
const kinds=["hotel","flight","transfer","car","rail","ferry","luggage","esim","vpn","phone","calls"];
export default {async fetch(req,env){
 const u=new URL(req.url),origin=req.headers.get("Origin"),allowed=env.ALLOWED_ORIGIN;
 const cors=origin===allowed?{"Access-Control-Allow-Origin":allowed,"Vary":"Origin","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}:{};
 if(origin&&origin!==allowed)return reply({error:"origin_not_allowed"},403);
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
 if(u.pathname==="/api/status"&&req.method==="GET")return reply({services:Object.fromEntries(kinds.map(k=>[k,{ready:false,state:"partner_approval_required"}])),currency:{ready:true,source:"ExchangeRate-API"}},200,cors);
 if(u.pathname==="/api/search"&&req.method==="POST"){
  if(Number(req.headers.get("Content-Length")||0)>8192)return reply({error:"request_too_large"},413,cors);
  let q;try{const raw=await req.text();if(raw.length>8192)throw Error();q=JSON.parse(raw)}catch{return reply({error:"invalid_request"},400,cors)}
  if(!validateSearch(q))return reply({error:"invalid_query"},400,cors);
  // Enable a provider adapter only after contract and sandbox verification.
  return reply({state:"partner_approval_required",service:q.service,offers:[]},503,cors);
 }
 return reply({error:"not_found"},404,cors);
}};