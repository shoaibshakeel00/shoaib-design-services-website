export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok:false, error:"Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const clean = {
      name: String(body.name || "").trim().slice(0,100),
      phone: String(body.phone || "").trim().slice(0,30),
      email: String(body.email || "").trim().slice(0,120),
      service: String(body.service || "").trim().slice(0,100),
      template: String(body.template || "").trim().slice(0,120),
      details: String(body.details || "").trim().slice(0,2000)
    };

    if (!clean.name || !clean.phone || !clean.service) {
      return res.status(400).json({ok:false,error:"Name, phone and service are required."});
    }

    const requestId = "SS-" + Date.now().toString(36).toUpperCase();

    // Optional Resend connection. Add RESEND_API_KEY and FROM_EMAIL in Vercel.
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
      const html = `
        <h2>New S.S Professional Services Order</h2>
        <p><b>Request ID:</b> ${escapeHtml(requestId)}</p>
        <p><b>Name:</b> ${escapeHtml(clean.name)}</p>
        <p><b>Phone:</b> ${escapeHtml(clean.phone)}</p>
        <p><b>Email:</b> ${escapeHtml(clean.email)}</p>
        <p><b>Service:</b> ${escapeHtml(clean.service)}</p>
        <p><b>Template:</b> ${escapeHtml(clean.template || "Not selected")}</p>
        <p><b>Details:</b><br/>${escapeHtml(clean.details).replaceAll("\\n","<br/>")}</p>
      `;
      const r = await fetch("https://api.resend.com/emails", {
        method:"POST",
        headers:{
          "Authorization":`Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          from:process.env.FROM_EMAIL,
          to:[process.env.ADMIN_EMAIL],
          subject:`New S.S order ${requestId} — ${clean.service}`,
          html
        })
      });
      if (!r.ok) {
        const text = await r.text();
        return res.status(502).json({ok:false,error:"Email service failed.",requestId,detail:text.slice(0,300)});
      }
    }

    return res.status(200).json({
      ok:true,
      requestId,
      message:"Order received. We will contact you shortly."
    });
  } catch (e) {
    return res.status(400).json({ok:false,error:"Invalid request."});
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
