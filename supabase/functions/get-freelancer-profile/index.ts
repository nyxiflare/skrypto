
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const url = new URL(req.url)
    const freelancerId = url.searchParams.get('id')

    if (!freelancerId) {
      return new Response(
        JSON.stringify({ error: 'Missing freelancer id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, username, bio, profile_image, wallet_address')
      .eq('id', freelancerId)
      .single()

    if (profileError) {
      return new Response(
        JSON.stringify({ error: profileError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: skills } = await supabase
      .from('skills')
      .select('skill_name, category, rate, rate_type, description')
      .eq('user_id', freelancerId)

    const { data: portfolio } = await supabase
      .from('portfolio')
      .select('*')
      .eq('user_id', freelancerId)

    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating, comment, created_at, reviewer_id')
      .eq('freelancer_id', freelancerId)
      .order('created_at', { ascending: false })

    return new Response(
      JSON.stringify({
        profile,
        skills,
        portfolio,
        reviews
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Get freelancer profile error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
