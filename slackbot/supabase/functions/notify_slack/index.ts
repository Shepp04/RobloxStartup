import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  console.log("⚡️ Function triggered");

  const body = await req.json();
  console.log("📨 Incoming request body:", JSON.stringify(body, null, 2));

  const row = body.record; // Supabase sends the inserted row under `record`
  const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");

  if (!slackWebhookUrl) {
    console.error("❌ SLACK_WEBHOOK_URL environment variable not set");
    return new Response("Slack webhook URL is missing", { status: 500 });
  }

  const text = `
  *📧 ${row.email} subscribed to the mailing list! 📧*

  > *ID:* \`${row.id || "N/A"}\`
  > *Created at:* \`${row.created_at || new Date().toISOString()}\`
  > *Details:*
  > \`\`\`json
  ${JSON.stringify(row, null, 2)}
  \`\`\`
  `;

  const response = await fetch(slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Slack webhook failed:", errorText);
    return new Response("Failed to send Slack message", { status: 500 });
  }

  console.log("✅ Slack message sent successfully");
  return new Response("Slack message sent!", { status: 200 });
});
