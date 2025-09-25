import { NextRequest, NextResponse } from 'next/server'

// Enhanced email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Check basic format
  if (!emailRegex.test(email)) {
    return false
  }

  // Additional checks for obviously invalid emails
  const emailParts = email.split('@')
  if (emailParts.length !== 2) {
    return false
  }

  const domain = emailParts[1]
  if (!domain) {
    return false
  }

  // Check for minimum domain requirements
  if (domain.length < 4) {
    // e.g., a.co is 4 chars, a.c is invalid
    return false
  }

  // Check if domain has at least one dot and reasonable TLD
  const domainParts = domain.split('.')
  if (domainParts.length < 2) {
    return false
  }

  // Check TLD length (most TLDs are at least 2 characters)
  const tld = domainParts[domainParts.length - 1]
  if (!tld || tld.length < 2) {
    return false
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'website_footer', metadata = {} } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          error: 'Please enter a valid email address (e.g., user@example.com)',
        },
        { status: 400 },
      )
    }

    // Check for required Klaviyo environment variables
    const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY
    const klaviyoListId = process.env.KLAVIYO_LIST_ID

    if (!klaviyoApiKey || !klaviyoListId) {
      return NextResponse.json({ error: 'Service configuration error' }, { status: 500 })
    }

    // Create or update profile with subscription
    const profileData = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          properties: {
            subscription_source: source,
            signup_timestamp: new Date().toISOString(),
            ...metadata,
          },
        },
      },
    }

    // First, create or update the profile
    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        revision: '2023-12-15',
      },
      body: JSON.stringify(profileData),
    })

    let profileId = null
    if (profileResponse.ok) {
      const profileResult = await profileResponse.json()
      profileId = profileResult.data?.id
    } else {
      // If profile already exists, get it
      const searchResponse = await fetch(
        `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`,
        {
          headers: {
            Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
            revision: '2023-12-15',
          },
        },
      )

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json()
        profileId = searchResult.data?.[0]?.id

        // If no profile found in search results, the email might be invalid
        if (!profileId) {
          return NextResponse.json(
            {
              error:
                "Unable to process this email address. Please check if it's valid and try again.",
            },
            { status: 400 },
          )
        }
      } else {
        const searchError = await searchResponse.json()
        console.error('❌ Profile search failed:', searchError)

        // Check if it's a 400 error (bad request) which often indicates invalid email
        if (searchResponse.status === 400) {
          return NextResponse.json(
            {
              error: 'Invalid email address format. Please enter a valid email.',
            },
            { status: 400 },
          )
        }

        return NextResponse.json(
          {
            error: 'Unable to process your email at this time. Please try again later.',
          },
          { status: 500 },
        )
      }
    }

    // Final check: if we still don't have a profileId, something went wrong
    if (!profileId) {
      return NextResponse.json(
        {
          error: "Unable to process this email address. Please verify it's correct and try again.",
        },
        { status: 400 },
      )
    }

    // Add the user to a specific list
    const addToListData = {
      data: [
        {
          type: 'profile',
          id: `${profileId}`,
        },
      ],
    }

    const klaviyoResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${klaviyoListId}/relationships/profiles/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
          'Content-Type': 'application/json',
          revision: '2023-12-15',
        },
        body: JSON.stringify(addToListData),
      },
    )

    if (!klaviyoResponse.ok) {
      const errorData = await klaviyoResponse.json()

      // Handle specific Klaviyo errors
      if (klaviyoResponse.status === 409) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 409 },
        )
      }

      if (klaviyoResponse.status === 400) {
        // Check if the error is related to invalid profile or email
        const errorMessage = errorData.errors?.[0]?.detail || 'Invalid email address'
        console.error('❌ Bad request error:', errorMessage)
        return NextResponse.json(
          {
            error:
              "Unable to process this email address. Please check if it's valid and try again.",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          error: 'Unable to complete subscription at this time. Please try again later.',
        },
        { status: 500 },
      )
    }

    // No need to parse response body for this endpoint

    // Track the subscription event
    const eventData = {
      data: {
        type: 'event',
        attributes: {
          profile: {
            email: email,
          },
          metric: {
            name: 'Newsletter Subscription',
          },
          properties: {
            source: source,
            ...metadata,
          },
          time: new Date().toISOString(),
        },
      },
    }

    // Send tracking event (don't wait for response)
    fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        revision: '2023-12-15',
      },
      body: JSON.stringify(eventData),
    }).catch((err) => console.error('Event tracking failed:', err))

    // Log successful subscription (without exposing sensitive data)
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      profileId: profileId,
    })
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 })
  }
}
