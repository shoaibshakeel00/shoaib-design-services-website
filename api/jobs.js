export default async function handler(req,res){
  const fallback=[
    {id:"fpsc-official",type:"Government",title:"Latest FPSC Jobs & Advertisements",company:"Federal Public Service Commission",location:"Pakistan",deadline:"Check official advertisement",applyUrl:"https://www.fpsc.gov.pk/Jobs/81",source:"FPSC Official",posted:"Official source"},
    {id:"njp-official",type:"Government",title:"Latest National Jobs Portal Opportunities",company:"National Jobs Portal",location:"Pakistan",deadline:"Check job listing",applyUrl:"https://njp.gov.pk/",source:"NJP Official",posted:"Official source"}
  ];
  const urls=(process.env.JOB_FEED_URLS||"").split(",").map(x=>x.trim()).filter(Boolean);
  let jobs=[...fallback];
  for(const url of urls){
    try{
      const r=await fetch(url,{headers:{"User-Agent":"SS-Professional-Services/1.0"}});
      if(!r.ok) continue;
      const text=await r.text();
      const parsed=text.trim().startsWith("{")||text.trim().startsWith("[")?JSON.parse(text):parseRSS(text);
      if(Array.isArray(parsed)) jobs=jobs.concat(parsed.map(normalize));
      else if(parsed?.jobs) jobs=jobs.concat(parsed.jobs.map(normalize));
    }catch{}
  }
  // Newest first, de-duplicate by URL/title.
  const seen=new Set();
  jobs=jobs.filter(j=>{
    const key=(j.applyUrl||"")+"|"+j.title;
    if(seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0,50);
  res.setHeader("Cache-Control","s-maxage=900, stale-while-revalidate=3600");
  res.status(200).json({ok:true,jobs,updatedAt:new Date().toISOString()});
}
function normalize(j){
  return {
    id:j.id||crypto.randomUUID(), type:j.type||"Private", title:j.title||"New Job",
    company:j.company||j.organization||"Company", location:j.location||"Pakistan",
    deadline:j.deadline||j.lastDate||"Check source", applyUrl:j.applyUrl||j.link||"#",
    source:j.source||"Job Feed", posted:j.posted||j.pubDate||"Recently posted"
  };
}
function parseRSS(xml){
  const out=[]; const items=xml.match(/<item[\s\S]*?<\/item>/gi)||[];
  for(const item of items){
    const get=(tag)=>{const m=item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i"));return m?m[1].replace(/<!\[CDATA\[|\]\]>/g,"").trim():""};
    out.push({title:get("title"),link:get("link"),applyUrl:get("link"),posted:get("pubDate"),source:"RSS Feed"});
  }
  return out;
}
