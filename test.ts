import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

// Load environment variables
dotenv.config()

// HubSpot Form Config
const HUBSPOT_PORTAL_ID = '43898601'
const HUBSPOT_FORM_GUID = '9e21cda3-9c9f-41d7-a05a-b5e94b34cd94'
const FORM_ENDPOINT = `https://forms.hubspot.com/uploads/form/v2/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`

// Example form data (replace with actual field names/values)
const formData: Record<string, string> = {
  firstname: 'TEST',
  lastname: 'WEBLOO',
  phone: '+212630398456',
  email: 'john.doe@example.com',
  lease_timeline: '3-6 months',
  zip: '40444',
  make: 'BMW',
  model_wits_test: 'X5',
  car_year: String(2025),
  exterior_color__dr_lease_: 'Darker',
  interior_color__dr_lease_: 'Darker',
  term: '36 months',
  mileage__dr_lease_: String(7500),
  open_to_demo_loaner_vehicles_: String(true),
  open_to_preowned_cpo_lease_: String(false),
  have_you_leased_or_financed_a_similar_vehicle_before_: String(true),
  communication_preference: 'call',
  do_you_have_a_vehicle_to_trade_in_: String(false),
}

// Function to submit the form
async function submitForm(data: Record<string, string>) {
  const params = new URLSearchParams(data)

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (response.ok) {
    } else {
      const errorText = await response.text()
      console.error(`❌ Failed to submit form. Status: ${response.status}`)
      console.error(errorText)
    }
  } catch (err) {
    console.error('💥 Error submitting form:', err)
  }
}

// Execute submission
submitForm(formData)
