/**
 * Salto KS Access Control Integration via Seam API
 * Documentation: https://docs.seam.co/latest/device-and-system-integration-guides/salto-ks-access-control-system
 */

interface AccessSchedule {
  startsAt: string; // ISO 8601 format
  endsAt: string;   // ISO 8601 format
}

interface CreateUserParams {
  fullName: string;
  email: string;
  phoneNumber: string;
  accessSchedule: AccessSchedule;
}

interface AccessCodeResponse {
  userId: string;
  credentialId: string;
  code: string; // The PIN code
}

/**
 * Create a user in Salto KS with access credentials
 */
export async function createSaltoAccessCode(
  params: CreateUserParams
): Promise<AccessCodeResponse> {
  const seamApiKey = process.env.SEAM_API_KEY;
  const saltoSystemId = process.env.SALTO_SYSTEM_ID;

  if (!seamApiKey || !saltoSystemId) {
    throw new Error(
      "Seam API key or Salto System ID not configured. Please set SEAM_API_KEY and SALTO_SYSTEM_ID environment variables."
    );
  }

  try {
    // 1. Create user in Salto KS
    const userResponse = await fetch("https://connect.getseam.com/acs/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${seamApiKey}`,
      },
      body: JSON.stringify({
        acs_system_id: saltoSystemId,
        full_name: params.fullName,
        email: params.email,
        phone_number: params.phoneNumber,
        access_schedule: {
          starts_at: params.accessSchedule.startsAt,
          ends_at: params.accessSchedule.endsAt,
        },
      }),
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(`Failed to create Salto user: ${JSON.stringify(errorData)}`);
    }

    const userData = await userResponse.json();
    const userId = userData.acs_user.acs_user_id;

    // 2. Create PIN credential for the user
    const credentialResponse = await fetch(
      "https://connect.getseam.com/acs/credentials/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${seamApiKey}`,
        },
        body: JSON.stringify({
          acs_user_id: userId,
          access_method: "code",
          credential_manager_acs_system_id: saltoSystemId,
        }),
      }
    );

    if (!credentialResponse.ok) {
      const errorData = await credentialResponse.json();
      throw new Error(
        `Failed to create Salto credential: ${JSON.stringify(errorData)}`
      );
    }

    const credentialData = await credentialResponse.json();
    const code = credentialData.acs_credential.code;
    const credentialId = credentialData.acs_credential.acs_credential_id;

    return {
      userId,
      credentialId,
      code,
    };
  } catch (error) {
    console.error("Error creating Salto access code:", error);

    // Fallback: Generate a mock code for development/testing
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock access code for development");
      return {
        userId: "mock_user_" + Date.now(),
        credentialId: "mock_cred_" + Date.now(),
        code: Math.floor(100000 + Math.random() * 900000).toString(),
      };
    }

    throw error;
  }
}

/**
 * Revoke access for a user (optional - for cancellations)
 */
export async function revokeSaltoAccess(userId: string): Promise<void> {
  const seamApiKey = process.env.SEAM_API_KEY;

  if (!seamApiKey) {
    throw new Error("Seam API key not configured");
  }

  try {
    await fetch("https://connect.getseam.com/acs/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${seamApiKey}`,
      },
      body: JSON.stringify({
        acs_user_id: userId,
      }),
    });
  } catch (error) {
    console.error("Error revoking Salto access:", error);
    throw error;
  }
}
