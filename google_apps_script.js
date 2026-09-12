/**
 * =============================================================================
 * 🌌 SINGULARITY 2K26 - FESTIVAL REGISTRATION & ATTENDEE DATABASE ENGINE
 * =============================================================================
 * Organized by: N8N Data Science Community
 * In collaboration with: AWS SBG HBTU · Department of Mathematics, HBTU Kanpur
 *
 * PROTOCOL:
 * - Festival & all technical workshops are 100% FREE for all (Pass is for verification).
 * - HackNova 2.0 24-hour hackathon registration is ₹199 per squad.
 * =============================================================================
 */

const SHEET_NAME = "Singularity_2K26_Attendees";
const TARGET_ATTENDEES = 1500;

const HEADERS = [
  "Timestamp",
  "Pass Token ID",
  "Full Name",
  "Email Address",
  "WhatsApp / Phone",
  "College / University",
  "Branch / Department",
  "Academic Year",
  "Registration Type",
  "Amount Paid",
  "Payment / UTR Reference",
  "Character Class",
  "Gamer / Discord Tag",
  "Team Name",
  "Primary Track / Interest",
  "Status"
];

function getOrCreateSheet(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    var firstSheet = ss.getSheets()[0];
    if (firstSheet) {
      firstSheet.setName(SHEET_NAME);
      sheet = firstSheet;
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#0F2B14")
      .setFontColor("#55FF55");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * GET Request: Returns live attendee count and progress metrics
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss);
    
    var totalAttendees = Math.max(0, sheet.getLastRow() - 1);
    
    var response = {
      status: "success",
      count: totalAttendees,
      target: TARGET_ATTENDEES,
      percent: Math.min(100, ((totalAttendees / TARGET_ATTENDEES) * 100)).toFixed(1),
      timestamp: new Date().toISOString()
    };
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST Request: Records registration and returns confirmation
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss);
    
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var token = data.pass_token || data.token || ("SNG-2026-" + Math.floor(1000 + Math.random() * 9000));
    var name = data.name || data.fullName || "Anonymous Builder";
    var email = data.email || "";
    var phone = data.phone || "";
    var college = data.college || data.collegeName || "";
    var branch = data.branch || "Computer Science / Engineering";
    var year = data.year || "3rd Year";
    var regType = data.registration_type || "Singularity 2K26 Festival & Workshops Pass (FREE)";
    var amountPaid = data.amount_paid || (regType.indexOf("199") !== -1 ? "₹199" : "FREE (₹0)");
    var paymentRef = data.payment_ref || "N/A";
    var charClass = data.character_class || data.characterClass || "Zero-Day Hacker";
    var gamerTag = data.gamer_tag || data.gamerTag || "Builder";
    var teamName = data.team_name || data.teamName || "Individual Attendee";
    var interest = data.interest || data.primary_track || "All Festival Quests";
    var status = "CONFIRMED";
    
    // Append entry into spreadsheet
    sheet.appendRow([
      timestamp,
      token,
      name,
      email,
      phone,
      college,
      branch,
      year,
      regType,
      amountPaid,
      paymentRef,
      charClass,
      gamerTag,
      teamName,
      interest,
      status
    ]);
    
    var currentCount = sheet.getLastRow() - 1;
    
    // Dispatch stylized confirmation email if valid email is provided
    if (email && email.indexOf("@") !== -1) {
      try {
        sendFestPassEmail(name, email, token, regType, charClass, college, gamerTag, amountPaid);
      } catch (mailErr) {
        Logger.log("Email dispatch note: " + mailErr.toString());
      }
    }
    
    var result = {
      status: "success",
      message: "Registration recorded into Singularity 2K26 database successfully.",
      token: token,
      count: currentCount,
      target: TARGET_ATTENDEES,
      percent: Math.min(100, ((currentCount / TARGET_ATTENDEES) * 100)).toFixed(1)
    };
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends a themed Voxel Arcade Attendee Credential HTML confirmation email
 */
function sendFestPassEmail(name, email, token, regType, charClass, college, gamerTag, amountPaid) {
  var subject = "🎟️ [PASS CONFIRMED] Singularity 2K26 Registration — " + name + " (" + token + ")";
  
  var htmlBody = `
    <div style="background-color: #07010C; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 25px; border: 3px solid #55FF55; max-width: 600px; margin: auto;">
      <div style="text-align: center; border-bottom: 2px solid #3A1E54; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #FFFFFF; font-size: 26px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">SINGULARITY 2K26</h1>
        <p style="color: #FFD34D; font-size: 13px; margin: 5px 0 0 0; font-weight: bold;">MINECRAFT VOXEL WORLD × RETRO ARCADE FEST</p>
        <p style="color: #A0A0B0; font-size: 11px; margin: 3px 0 0 0;">N8N Data Science Community · AWS SBG HBTU · Dept of Mathematics, HBTU Kanpur</p>
      </div>

      <div style="background-color: #120524; border: 2px solid #55FF55; padding: 15px; margin-bottom: 20px; text-align: center;">
        <p style="color: #55FF55; font-size: 14px; margin: 0 0 6px 0; font-weight: bold;">✓ CREDENTIAL FORGED // ENTRY VERIFIED</p>
        <p style="font-size: 13px; margin: 0; color: #E0E0EE;">Greetings <strong>${name}</strong> (${gamerTag}), your official festival verification credential is active.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; color: #FFFFFF; background-color: #0E031A;">
        <tr style="border-bottom: 1px solid #2E1546;">
          <td style="padding: 10px; color: #FFD34D; font-weight: bold;">PASS TOKEN ID:</td>
          <td style="padding: 10px; color: #55FF55; font-family: monospace; font-size: 15px; font-weight: bold;">${token}</td>
        </tr>
        <tr style="border-bottom: 1px solid #2E1546;">
          <td style="padding: 10px; color: #4FD9FF; font-weight: bold;">ENLISTMENT TYPE:</td>
          <td style="padding: 10px;">${regType} (${amountPaid})</td>
        </tr>
        <tr style="border-bottom: 1px solid #2E1546;">
          <td style="padding: 10px; color: #4FD9FF; font-weight: bold;">CHARACTER CLASS:</td>
          <td style="padding: 10px;">${charClass}</td>
        </tr>
        <tr style="border-bottom: 1px solid #2E1546;">
          <td style="padding: 10px; color: #4FD9FF; font-weight: bold;">COLLEGE / CAMPUS:</td>
          <td style="padding: 10px;">${college}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #4FD9FF; font-weight: bold;">DATES & VENUE:</td>
          <td style="padding: 10px;">October 16–18, 2026 · HBTU East Campus, Kanpur</td>
        </tr>
      </table>

      <div style="background-color: #0A0214; border: 1px solid #3A1E54; padding: 12px; font-size: 11px; color: #A0A0B0; line-height: 1.5;">
        <p style="margin: 0;"><strong>Verification Protocol:</strong> Please present this Pass Token ID or your downloaded badge at the Spawn Check-in Desk at HBTU Nawabganj gate on Oct 16 to claim your physical access badge.</p>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #606075;">
        Singularity 2K26 Organizers · Harcourt Butler Technical University, Kanpur
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}
