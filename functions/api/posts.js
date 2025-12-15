export async function onRequest(context) {
  const { DB } = context.env;
  
  try {
    const { results } = await DB.prepare(
      "SELECT id, title, slug, excerpt, created_at FROM posts ORDER BY created_at DESC"
    ).all();
    
    return new Response(JSON.stringify(results), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}