
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

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const userId = url.pathname.split('/').pop()

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch user skills for performance data
    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId)

    // Generate earnings trend data (last 6 months)
    const earningsData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        earnings: Math.floor(Math.random() * 3000) + 1000
      }
    })

    // Generate skills performance data
    const skillsData = skills?.map(skill => ({
      skill: skill.skill_name,
      jobs: Math.floor(Math.random() * 10) + 1,
      earnings: Math.floor(Math.random() * 5000) + 1000
    })) || []

    // Project status data
    const projectStatusData = [
      { status: 'Completed', count: Math.floor(Math.random() * 20) + 10, color: '#10B981' },
      { status: 'In Progress', count: Math.floor(Math.random() * 5) + 2, color: '#F59E0B' },
      { status: 'Pending', count: Math.floor(Math.random() * 3) + 1, color: '#EF4444' }
    ]

    const analytics = {
      earningsData,
      skillsData,
      projectStatusData,
      totalEarnings: earningsData.reduce((sum, item) => sum + item.earnings, 0),
      completedJobs: projectStatusData[0].count,
      avgRating: 4.8,
      responseRate: 95
    }

    return new Response(
      JSON.stringify(analytics),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Analytics error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
