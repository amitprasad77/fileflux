/**
 * Netlify Serverless Function: validate-license
 * ================================================
 * File location: /netlify/functions/validate-license.js
 *
 * This function validates a Lemon Squeezy license key.
 * It's called by premium.js on the frontend.
 *
 * Setup:
 *  1. In Netlify dashboard → Site settings → Environment variables, add:
 *     LEMONSQUEEZY_API_KEY = your API key from app.lemonsqueezy.com/settings/api
 *     LEMONSQUEEZY_STORE_ID = your store ID (shown in LS dashboard URL)
 *  2. Deploy — Netlify auto-detects functions in /netlify/functions/
 *
 * The frontend calls: POST /api/validate-license
 * Netlify rewrites /api/* → /.netlify/functions/* automatically.
 * Add this to your netlify.toml:
 *
 *   [[redirects]]
 *     from = "/api/*"
 *     to = "/.netlify/functions/:splat"
 *     status = 200
 */

exports.handler = async function (event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Parse body
  let license;
  try {
    const body = JSON.parse(event.body || '{}');
    license = (body.license || '').trim().toUpperCase();
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false, message: 'Invalid request body' }),
    };
  }

  if (!license) {
    return {
      statusCode: 400,
      body: JSON.stringify({ valid: false, message: 'No license key provided' }),
    };
  }

  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  if (!apiKey) {
    console.error('LEMONSQUEEZY_API_KEY not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ valid: false, message: 'Server configuration error' }),
    };
  }

  try {
    // Call Lemon Squeezy License Activation API
    const lsRes = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ license_key: license }),
    });

    const lsData = await lsRes.json();

    // Lemon Squeezy returns { valid: true/false, license_key: {...}, meta: {...} }
    if (lsData.valid) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valid: true,
          plan: lsData.meta?.product_name || 'Premium',
          expires: lsData.license_key?.expires_at || null,
        }),
      };
    } else {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valid: false,
          message: lsData.error || 'Invalid or expired license key.',
        }),
      };
    }
  } catch (err) {
    console.error('License validation error:', err);
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: false,
        message: 'Could not verify license. Please try again.',
      }),
    };
  }
};
