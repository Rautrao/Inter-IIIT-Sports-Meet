import assert from "assert";
import { hashPassword, verifyPassword } from "../src/lib/auth/passwords.js";
import { signSessionToken, verifySessionToken } from "../src/lib/auth/session.js";
import { validateRegistrationRules } from "../src/lib/validation/rules.js";
import { registrationSubmitSchema } from "../src/lib/validation/schemas.js";
import { SPORTS_CONFIG, GLOBAL_RULES, getSportConfig } from "../src/lib/sports/config.js";
import { formatCsv } from "../src/lib/csv/generator.js";

async function runTests() {
  console.log("=========================================");
  console.log("🧪 RUNNING BACKEND FOUNDATION TESTS");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  // 1. Password Tests
  await testAsync("bcrypt password hashing and verification", async () => {
    const raw = "super_secure_pass_123";
    const hash = await hashPassword(raw);
    assert.strictEqual(typeof hash, "string");
    assert.ok(hash.startsWith("$2"));

    const isValid = await verifyPassword(raw, hash);
    assert.strictEqual(isValid, true);

    const isInvalid = await verifyPassword("wrong_pass", hash);
    assert.strictEqual(isInvalid, false);
  });

  // 2. Session HMAC Token Tests
  test("Session token signing, verification, and tamper detection", () => {
    const payload = {
      userId: 1,
      username: "iiitdm-kancheepuram",
      role: "iiit",
      iiitCode: "iiitdm-kancheepuram",
      iiitName: "IIITDM Kancheepuram",
      exp: Date.now() + 60000,
    };

    const token = signSessionToken(payload);
    assert.ok(token.includes("."));

    const decoded = verifySessionToken(token);
    assert.strictEqual(decoded.username, "iiitdm-kancheepuram");
    assert.strictEqual(decoded.role, "iiit");

    // Tampered token test
    const tampered = token.slice(0, -4) + "abcd";
    const tamperedDecoded = verifySessionToken(tampered);
    assert.strictEqual(tamperedDecoded, null);

    // Expired token test
    const expiredPayload = { ...payload, exp: Date.now() - 1000 };
    const expiredToken = signSessionToken(expiredPayload);
    assert.strictEqual(verifySessionToken(expiredToken), null);
  });

  // 3. Sport Catalog Sanity
  test("Sport catalog integrity & official rulebook parameters", () => {
    assert.strictEqual(GLOBAL_RULES.MAX_UNIQUE_STUDENTS_PER_IIIT, 150);
    assert.strictEqual(GLOBAL_RULES.MAX_NORMAL_SPORTS_PER_STUDENT, 2);
    assert.strictEqual(GLOBAL_RULES.MAX_ATHLETICS_INDIVIDUAL_EVENTS, 3);
    assert.strictEqual(GLOBAL_RULES.MAX_AQUATICS_INDIVIDUAL_EVENTS, 3);

    // Athletics
    const athletics = getSportConfig("athletics");
    assert.ok(athletics);
    assert.strictEqual(athletics.events.M.length, 15);
    assert.strictEqual(athletics.events.F.length, 12);

    // Aquatics
    const aquatics = getSportConfig("aquatics");
    assert.ok(aquatics);
    assert.strictEqual(aquatics.events.M.length, 15);
    assert.strictEqual(aquatics.events.F.length, 11);

    // Cricket
    const cricket = getSportConfig("cricket");
    assert.strictEqual(cricket.teamLimits.M, 15);

    // Chess
    const chess = getSportConfig("chess");
    assert.strictEqual(chess.teamLimits.mixed, 4);
  });

  // 4. Business Rules: Valid Multi-Sport Case
  test("Business rules: Valid combination (2 Normal Sports + Athletics + Aquatics)", () => {
    const students = [
      { rollNumber: "2023BCS001", name: "ALOK KUMAR", gender: "M" },
      { rollNumber: "2023BCS002", name: "PRIYA SHARMA", gender: "F" },
    ];

    const entries = [
      // Alok in Cricket (Normal Sport 1)
      { sportId: "cricket", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      // Alok in Volleyball (Normal Sport 2)
      { sportId: "volleyball", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      // Alok in Athletics 100m, 200m, Long Jump (Athletics individual limit: 3)
      { sportId: "athletics", eventId: "100m", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "athletics", eventId: "200m", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "athletics", eventId: "long_jump", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      // Alok in Athletics Relay (Relay does not count towards the 3 individual events)
      { sportId: "athletics", eventId: "4x100m_relay", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      // Alok in Aquatics 50m Free Style
      { sportId: "aquatics", eventId: "50m_freestyle", gender: "M", rollNumber: "2023BCS001", isReserve: false },

      // Priya in Badminton (Normal Sport 1)
      { sportId: "badminton", eventId: "team", gender: "F", rollNumber: "2023BCS002", isReserve: false },
      // Priya in Table Tennis (Normal Sport 2)
      { sportId: "table_tennis", eventId: "team", gender: "F", rollNumber: "2023BCS002", isReserve: false },
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, true, `Expected valid, got errors: ${result.errors.join("; ")}`);
    assert.strictEqual(result.errors.length, 0);
  });

  // 5. Business Rules: Invalid Multi-Sport Case (> 2 normal sports)
  test("Business rules: Rejection of > 2 normal sports", () => {
    const students = [
      { rollNumber: "2023BCS001", name: "ALOK KUMAR", gender: "M" },
    ];

    const entries = [
      { sportId: "cricket", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "volleyball", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "basketball", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false }, // 3rd normal sport!
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, false);
    assert.ok(result.errors.some((e) => e.includes("Multi-sport rule violated")));
  });

  // 6. Business Rules: Athletics Individual Event Limit Exceeded (> 3)
  test("Business rules: Rejection of > 3 individual athletics events", () => {
    const students = [
      { rollNumber: "2023BCS001", name: "ALOK KUMAR", gender: "M" },
    ];

    const entries = [
      { sportId: "athletics", eventId: "100m", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "athletics", eventId: "200m", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "athletics", eventId: "400m", gender: "M", rollNumber: "2023BCS001", isReserve: false },
      { sportId: "athletics", eventId: "shot_put", gender: "M", rollNumber: "2023BCS001", isReserve: false }, // 4th individual event!
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, false);
    assert.ok(result.errors.some((e) => e.includes("Athletics event limit violated")));
  });

  // 7. Business Rules: Gender Mismatch Detection
  test("Business rules: Rejection of gender mismatch", () => {
    const students = [
      { rollNumber: "2023BCS002", name: "PRIYA SHARMA", gender: "F" },
    ];

    const entries = [
      { sportId: "football", eventId: "team", gender: "M", rollNumber: "2023BCS002", isReserve: false },
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, false);
    assert.ok(result.errors.some((e) => e.includes("Gender mismatch")));
  });

  // 8. Business Rules: Squad Size Exceeded
  test("Business rules: Rejection when team quota is exceeded", () => {
    // Badminton Women max is 3
    const students = [
      { rollNumber: "2023BCS101", name: "STUDENT 1", gender: "F" },
      { rollNumber: "2023BCS102", name: "STUDENT 2", gender: "F" },
      { rollNumber: "2023BCS103", name: "STUDENT 3", gender: "F" },
      { rollNumber: "2023BCS104", name: "STUDENT 4", gender: "F" },
    ];

    const entries = [
      { sportId: "badminton", eventId: "team", gender: "F", rollNumber: "2023BCS101", isReserve: false },
      { sportId: "badminton", eventId: "team", gender: "F", rollNumber: "2023BCS102", isReserve: false },
      { sportId: "badminton", eventId: "team", gender: "F", rollNumber: "2023BCS103", isReserve: false },
      { sportId: "badminton", eventId: "team", gender: "F", rollNumber: "2023BCS104", isReserve: false }, // 4th player! Limit is 3
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, false);
    assert.ok(result.errors.some((e) => e.includes("Squad size exceeded for Badminton (F)")));
  });

  // 9. Business Rules: Cap of 150 Unique Students
  test("Business rules: Rejection when > 150 unique students are submitted", () => {
    const students = [];
    for (let i = 1; i <= 151; i++) {
      students.push({
        rollNumber: `2023BCS${String(i).padStart(3, "0")}`,
        name: `STUDENT ${i}`,
        gender: "M",
      });
    }

    const entries = [
      { sportId: "cricket", eventId: "team", gender: "M", rollNumber: "2023BCS001", isReserve: false },
    ];

    const result = validateRegistrationRules({ students, entries });
    assert.strictEqual(result.isValid, false);
    assert.ok(result.errors.some((e) => e.includes("Maximum unique students limit exceeded")));
  });

  // 10. Zod Payload Schema Normalization
  test("Zod Schema: Normalizes roll number and names to uppercase", () => {
    const rawPayload = {
      contactDetails: {
        contactName: "Prof. Rajesh Sharma",
        contactEmail: "sports@iiitdm.ac.in",
        contactPhone: "9876543210",
        notes: "Contingent arrives 18th Dec",
      },
      students: [
        { rollNumber: "  2023bcs001  ", name: "  rahul sharma  ", gender: "M" },
      ],
      entries: [
        { sportId: "CRICKET", eventId: "TEAM", gender: "M", rollNumber: "  2023bcs001  ", isReserve: false },
      ],
    };

    const parsed = registrationSubmitSchema.parse(rawPayload);
    assert.strictEqual(parsed.students[0].rollNumber, "2023BCS001");
    assert.strictEqual(parsed.students[0].name, "RAHUL SHARMA");
    assert.strictEqual(parsed.entries[0].rollNumber, "2023BCS001");
    assert.strictEqual(parsed.entries[0].sportId, "cricket");
    assert.strictEqual(parsed.entries[0].eventId, "team");
  });

  // 11. CSV Escaping and Formatting Test
  test("CSV Generator: Proper RFC 4180 escaping for quotes and commas", () => {
    const headers = ["IIIT Name", "Student Name", "Notes"];
    const rows = [
      ['IIITDM Kancheepuram', 'RAHUL "THE FLASH" SHARMA', 'Arrives early, needs coach pass'],
      ['IIIT Allahabad', 'PRIYA VERMA', 'Normal arrival'],
    ];

    const csv = formatCsv(headers, rows);
    assert.ok(csv.includes('"RAHUL ""THE FLASH"" SHARMA"'));
    assert.ok(csv.includes('"Arrives early, needs coach pass"'));
    assert.ok(csv.includes("IIIT Allahabad,PRIYA VERMA,Normal arrival"));
  });

  console.log("\n=========================================");
  console.log(`🏁 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
