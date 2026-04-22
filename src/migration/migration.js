// run-once-migration.js
// Run: node run-once-migration.js

const mongoose = require("mongoose");
const User = require("../models/registers");
const { Intro, Project, Education, Skill, Expereince } = require("../models/portFolio");
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();
const url = process.env.LIVEDB; // Your MongoDB connection string

const runMigration = async () => {
  try {
    // ✅ Your MongoDB connection string
    await mongoose.connect(url);
    console.log("MongoDB Connected!");
    // Step 1: Find user
    const user = await User.findOne({ firstName: /santosh/i });
    if (!user) {
      console.log("❌ User not found!");
      process.exit(1);
    }
    const userId = user._id;
    console.log("✅ User found:", user.firstName, "| ID:", userId);

    // Step 2: Check existing data before update
    const beforeCheck = {
      intros:      await Intro.countDocuments({}),
      projects:    await Project.countDocuments({}),
      educations:  await Education.countDocuments({}),
      experiences: await Expereince.countDocuments({}),
      skills:      await Skill.countDocuments({}),
    };
    console.log("\n📊 Documents found before migration:", beforeCheck);

    // Step 3: Update all collections
    const [i, p, ed, ex, sk] = await Promise.all([
      Intro.updateMany({},      { $set: { userId: userId } }),
      Project.updateMany({},    { $set: { userId: userId } }),
      Education.updateMany({},  { $set: { userId: userId } }),
      Expereince.updateMany({}, { $set: { userId: userId } }),
      Skill.updateMany({},      { $set: { userId: userId } }),
    ]);

    // Step 4: Show results
    console.log("\n✅ Migration Done!");

    console.log("Intros updated:     ", i.modifiedCount);
    console.log("Projects updated:   ", p.modifiedCount);
    console.log("Educations updated: ", ed.modifiedCount);
    console.log("Experiences updated:", ex.modifiedCount);
    console.log("Skills updated:     ", sk.modifiedCount);

    // Step 5: Verify - check one document
    const sampleIntro = await Intro.findOne({});
    console.log("\n🔍 Sample Intro after migration:", {
      _id:    sampleIntro._id,
      name:   sampleIntro.name,
      userId: userId  // ← Should show userId now
    });

  } catch (error) {
    console.log("❌ Migration Failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB Disconnected!");
  }
};

runMigration();