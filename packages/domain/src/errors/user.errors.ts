import { AppError } from "@dms/shared/appError";

export const UserErrors = {
  anonymous_provider_disabled: (details?: unknown) =>
    new AppError({
      message: "Anonymous sign-in is disabled.",
      status: 403,
      code: "anonymous_provider_disabled",
      details,
    }),
  bad_code_verifier: (details?: unknown) =>
    new AppError({
      message: "The code verifier is invalid or missing.",
      status: 400,
      code: "bad_code_verifier",
      details,
    }),
  bad_json: (details?: unknown) =>
    new AppError({
      message: "The request body contains invalid JSON.",
      status: 400,
      code: "bad_json",
      details,
    }),
  bad_jwt: (details?: unknown) =>
    new AppError({
      message: "The JWT is invalid.",
      status: 401,
      code: "bad_jwt",
      details,
    }),
  bad_oauth_callback: (details?: unknown) =>
    new AppError({
      message: "The OAuth callback URL is invalid.",
      status: 400,
      code: "bad_oauth_callback",
      details,
    }),
  bad_oauth_state: (details?: unknown) =>
    new AppError({
      message: "The OAuth state is invalid or has expired.",
      status: 400,
      code: "bad_oauth_state",
      details,
    }),
  captcha_failed: (details?: unknown) =>
    new AppError({
      message: "Captcha verification failed.",
      status: 400,
      code: "captcha_failed",
      details,
    }),
  conflict: (details?: unknown) =>
    new AppError({
      message: "The request could not be completed due to a conflict.",
      status: 409,
      code: "conflict",
      details,
    }),
  email_address_invalid: (details?: unknown) =>
    new AppError({
      message: "The email address is not valid.",
      status: 400,
      code: "email_address_invalid",
      details,
    }),
  email_address_not_authorized: (details?: unknown) =>
    new AppError({
      message: "The email address is not authorized to sign up.",
      status: 403,
      code: "email_address_not_authorized",
      details,
    }),
  email_conflict_identity_not_deletable: (details?: unknown) =>
    new AppError({
      message: "The email address is associated with a non-deletable identity.",
      status: 409,
      code: "email_conflict_identity_not_deletable",
      details,
    }),
  email_exists: (details?: unknown) =>
    new AppError({
      message: "The email address is already registered.",
      status: 409,
      code: "email_exists",
      details,
    }),
  email_not_confirmed: (details?: unknown) =>
    new AppError({
      message: "The email address has not been confirmed.",
      status: 401,
      code: "email_not_confirmed",
      details,
    }),
  email_provider_disabled: (details?: unknown) =>
    new AppError({
      message: "Email sign-in is disabled.",
      status: 403,
      code: "email_provider_disabled",
      details,
    }),
  flow_state_expired: (details?: unknown) =>
    new AppError({
      message: "The authentication flow state has expired.",
      status: 400,
      code: "flow_state_expired",
      details,
    }),
  hook_payload_invalid_content_type: (details?: unknown) =>
    new AppError({
      message: "The hook payload has an invalid content type.",
      status: 400,
      code: "hook_payload_invalid_content_type",
      details,
    }),
  hook_payload_over_size_limit: (details?: unknown) =>
    new AppError({
      message: "The hook payload exceeds the size limit.",
      status: 413,
      code: "hook_payload_over_size_limit",
      details,
    }),
  hook_timeout: (details?: unknown) =>
    new AppError({
      message: "The hook request timed out.",
      status: 504,
      code: "hook_timeout",
      details,
    }),
  hook_timeout_after_retry: (details?: unknown) =>
    new AppError({
      message: "The hook request timed out after retries.",
      status: 504,
      code: "hook_timeout_after_retry",
      details,
    }),
  identity_already_exists: (details?: unknown) =>
    new AppError({
      message: "The identity already exists.",
      status: 409,
      code: "identity_already_exists",
      details,
    }),
  identity_not_found: (details?: unknown) =>
    new AppError({
      message: "The identity was not found.",
      status: 404,
      code: "identity_not_found",
      details,
    }),
  insufficient_aal: (details?: unknown) =>
    new AppError({
      message: "The authentication level is insufficient.",
      status: 401,
      code: "insufficient_aal",
      details,
    }),
  invalid_credentials: (details?: unknown) =>
    new AppError({
      message: "Invalid email or password.",
      status: 401,
      code: "invalid_credentials",
      details,
    }),
  invite_not_found: (details?: unknown) =>
    new AppError({
      message: "The invite was not found.",
      status: 404,
      code: "invite_not_found",
      details,
    }),
  manual_linking_disabled: (details?: unknown) =>
    new AppError({
      message: "Manual linking is disabled.",
      status: 403,
      code: "manual_linking_disabled",
      details,
    }),
  mfa_challenge_expired: (details?: unknown) =>
    new AppError({
      message: "The MFA challenge has expired.",
      status: 400,
      code: "mfa_challenge_expired",
      details,
    }),
  mfa_factor_name_conflict: (details?: unknown) =>
    new AppError({
      message: "The MFA factor name conflicts with an existing one.",
      status: 409,
      code: "mfa_factor_name_conflict",
      details,
    }),
  mfa_factor_not_found: (details?: unknown) =>
    new AppError({
      message: "The MFA factor was not found.",
      status: 404,
      code: "mfa_factor_not_found",
      details,
    }),
  mfa_ip_address_mismatch: (details?: unknown) =>
    new AppError({
      message: "The IP address does not match the MFA request.",
      status: 403,
      code: "mfa_ip_address_mismatch",
      details,
    }),
  mfa_phone_enroll_not_enabled: (details?: unknown) =>
    new AppError({
      message: "Phone enrollment for MFA is not enabled.",
      status: 403,
      code: "mfa_phone_enroll_not_enabled",
      details,
    }),
  mfa_phone_verify_not_enabled: (details?: unknown) =>
    new AppError({
      message: "Phone verification for MFA is not enabled.",
      status: 403,
      code: "mfa_phone_verify_not_enabled",
      details,
    }),
  mfa_totp_enroll_not_enabled: (details?: unknown) =>
    new AppError({
      message: "TOTP enrollment for MFA is not enabled.",
      status: 403,
      code: "mfa_totp_enroll_not_enabled",
      details,
    }),
  mfa_totp_verify_not_enabled: (details?: unknown) =>
    new AppError({
      message: "TOTP verification for MFA is not enabled.",
      status: 403,
      code: "mfa_totp_verify_not_enabled",
      details,
    }),
  mfa_verification_failed: (details?: unknown) =>
    new AppError({
      message: "MFA verification failed.",
      status: 401,
      code: "mfa_verification_failed",
      details,
    }),
  mfa_verification_rejected: (details?: unknown) =>
    new AppError({
      message: "MFA verification was rejected.",
      status: 403,
      code: "mfa_verification_rejected",
      details,
    }),
  mfa_verified_factor_exists: (details?: unknown) =>
    new AppError({
      message: "An MFA factor has already been verified.",
      status: 409,
      code: "mfa_verified_factor_exists",
      details,
    }),
  mfa_web_authn_enroll_not_enabled: (details?: unknown) =>
    new AppError({
      message: "WebAuthn enrollment for MFA is not enabled.",
      status: 403,
      code: "mfa_web_authn_enroll_not_enabled",
      details,
    }),
  mfa_web_authn_verify_not_enabled: (details?: unknown) =>
    new AppError({
      message: "WebAuthn verification for MFA is not enabled.",
      status: 403,
      code: "mfa_web_authn_verify_not_enabled",
      details,
    }),
  no_authorization: (details?: unknown) =>
    new AppError({
      message: "No authorization provided.",
      status: 401,
      code: "no_authorization",
      details,
    }),
  not_admin: (details?: unknown) =>
    new AppError({
      message: "The user is not an admin.",
      status: 403,
      code: "not_admin",
      details,
    }),
  oauth_provider_not_supported: (details?: unknown) =>
    new AppError({
      message: "The OAuth provider is not supported.",
      status: 400,
      code: "oauth_provider_not_supported",
      details,
    }),
  otp_disabled: (details?: unknown) =>
    new AppError({
      message: "One-time password (OTP) is disabled.",
      status: 403,
      code: "otp_disabled",
      details,
    }),
  otp_expired: (details?: unknown) =>
    new AppError({
      message: "The OTP has expired.",
      status: 400,
      code: "otp_expired",
      details,
    }),
  over_email_send_rate_limit: (details?: unknown) =>
    new AppError({
      message: "Email send rate limit exceeded.",
      status: 429,
      code: "over_email_send_rate_limit",
      details,
    }),
  over_request_rate_limit: (details?: unknown) =>
    new AppError({
      message: "Request rate limit exceeded.",
      status: 429,
      code: "over_request_rate_limit",
      details,
    }),
  over_sms_send_rate_limit: (details?: unknown) =>
    new AppError({
      message: "SMS send rate limit exceeded.",
      status: 429,
      code: "over_sms_send_rate_limit",
      details,
    }),
  phone_exists: (details?: unknown) =>
    new AppError({
      message: "The phone number is already registered.",
      status: 409,
      code: "phone_exists",
      details,
    }),
  phone_not_confirmed: (details?: unknown) =>
    new AppError({
      message: "The phone number has not been confirmed.",
      status: 401,
      code: "phone_not_confirmed",
      details,
    }),
  phone_provider_disabled: (details?: unknown) =>
    new AppError({
      message: "Phone sign-in is disabled.",
      status: 403,
      code: "phone_provider_disabled",
      details,
    }),
  provider_disabled: (details?: unknown) =>
    new AppError({
      message: "The provider is disabled.",
      status: 403,
      code: "provider_disabled",
      details,
    }),
  provider_email_needs_verification: (details?: unknown) =>
    new AppError({
      message: "The provider email needs verification.",
      status: 403,
      code: "provider_email_needs_verification",
      details,
    }),
  reauthentication_needed: (details?: unknown) =>
    new AppError({
      message: "Reauthentication is required.",
      status: 401,
      code: "reauthentication_needed",
      details,
    }),
  reauthentication_not_valid: (details?: unknown) =>
    new AppError({
      message: "Reauthentication is not valid.",
      status: 401,
      code: "reauthentication_not_valid",
      details,
    }),
  refresh_token_already_used: (details?: unknown) =>
    new AppError({
      message: "The refresh token has already been used.",
      status: 400,
      code: "refresh_token_already_used",
      details,
    }),
  refresh_token_not_found: (details?: unknown) =>
    new AppError({
      message: "The refresh token was not found.",
      status: 404,
      code: "refresh_token_not_found",
      details,
    }),
  request_timeout: (details?: unknown) =>
    new AppError({
      message: "The request timed out.",
      status: 408,
      code: "request_timeout",
      details,
    }),
  same_password: (details?: unknown) =>
    new AppError({
      message: "The new password cannot be the same as the old password.",
      status: 400,
      code: "same_password",
      details,
    }),
  saml_assertion_no_email: (details?: unknown) =>
    new AppError({
      message: "The SAML assertion does not contain an email address.",
      status: 400,
      code: "saml_assertion_no_email",
      details,
    }),
  saml_assertion_no_user_id: (details?: unknown) =>
    new AppError({
      message: "The SAML assertion does not contain a user ID.",
      status: 400,
      code: "saml_assertion_no_user_id",
      details,
    }),
  saml_entity_id_mismatch: (details?: unknown) =>
    new AppError({
      message: "The SAML entity ID does not match.",
      status: 400,
      code: "saml_entity_id_mismatch",
      details,
    }),
  saml_idp_already_exists: (details?: unknown) =>
    new AppError({
      message: "The SAML identity provider already exists.",
      status: 409,
      code: "saml_idp_already_exists",
      details,
    }),
  saml_idp_not_found: (details?: unknown) =>
    new AppError({
      message: "The SAML identity provider was not found.",
      status: 404,
      code: "saml_idp_not_found",
      details,
    }),
  saml_metadata_fetch_failed: (details?: unknown) =>
    new AppError({
      message: "Failed to fetch SAML metadata.",
      status: 400,
      code: "saml_metadata_fetch_failed",
      details,
    }),
  saml_provider_disabled: (details?: unknown) =>
    new AppError({
      message: "The SAML provider is disabled.",
      status: 403,
      code: "saml_provider_disabled",
      details,
    }),
  saml_relay_state_expired: (details?: unknown) =>
    new AppError({
      message: "The SAML relay state has expired.",
      status: 400,
      code: "saml_relay_state_expired",
      details,
    }),
  saml_relay_state_not_found: (details?: unknown) =>
    new AppError({
      message: "The SAML relay state was not found.",
      status: 404,
      code: "saml_relay_state_not_found",
      details,
    }),
  session_expired: (details?: unknown) =>
    new AppError({
      message: "The session has expired.",
      status: 401,
      code: "session_expired",
      details,
    }),
  session_not_found: (details?: unknown) =>
    new AppError({
      message: "The session was not found.",
      status: 404,
      code: "session_not_found",
      details,
    }),
  signup_disabled: (details?: unknown) =>
    new AppError({
      message: "Sign-up is disabled.",
      status: 403,
      code: "signup_disabled",
      details,
    }),
  single_identity_not_deletable: (details?: unknown) =>
    new AppError({
      message: "The single identity cannot be deleted.",
      status: 409,
      code: "single_identity_not_deletable",
      details,
    }),
  sms_send_failed: (details?: unknown) =>
    new AppError({
      message: "Failed to send SMS.",
      status: 500,
      code: "sms_send_failed",
      details,
    }),
  sso_domain_already_exists: (details?: unknown) =>
    new AppError({
      message: "The SSO domain already exists.",
      status: 409,
      code: "sso_domain_already_exists",
      details,
    }),
  sso_provider_not_found: (details?: unknown) =>
    new AppError({
      message: "The SSO provider was not found.",
      status: 404,
      code: "sso_provider_not_found",
      details,
    }),
  too_many_enrolled_mfa_factors: (details?: unknown) =>
    new AppError({
      message: "Too many MFA factors are enrolled.",
      status: 400,
      code: "too_many_enrolled_mfa_factors",
      details,
    }),
  unexpected_audience: (details?: unknown) =>
    new AppError({
      message: "The audience is unexpected.",
      status: 400,
      code: "unexpected_audience",
      details,
    }),
  unexpected_failure: (details?: unknown) =>
    new AppError({
      message: "An unexpected failure occurred.",
      status: 500,
      code: "unexpected_failure",
      details,
    }),
  user_already_exists: (details?: unknown) =>
    new AppError({
      message: "The user already exists.",
      status: 409,
      code: "user_already_exists",
      details,
    }),
  user_banned: (details?: unknown) =>
    new AppError({
      message: "The user is banned.",
      status: 403,
      code: "user_banned",
      details,
    }),
  user_not_found: (details?: unknown) =>
    new AppError({
      message: "The user was not found.",
      status: 404,
      code: "user_not_found",
      details,
    }),
  user_sso_managed: (details?: unknown) =>
    new AppError({
      message: "The user is managed by SSO.",
      status: 403,
      code: "user_sso_managed",
      details,
    }),
  validation_failed: (details?: unknown) =>
    new AppError({
      message: "Validation failed.",
      status: 400,
      code: "validation_failed",
      details,
    }),
  weak_password: (details?: unknown) =>
    new AppError({
      message: "The password is too weak.",
      status: 400,
      code: "weak_password",
      details,
    }),
  default: (details?: unknown) =>
    new AppError({
      message: "Internal server error. Please try again later.",
      status: 500,
      code: "DEFAULT",
      details,
    }),
};
