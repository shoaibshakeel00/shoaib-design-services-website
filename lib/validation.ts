export const allowedMime=['image/jpeg','image/png','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const maxFileSize=4*1024*1024;
export function validFile(file:{type:string,size:number}){return allowedMime.includes(file.type)&&file.size<=maxFileSize;}
export function safeText(value:unknown,max=2000){return String(value??'').trim().slice(0,max);}
