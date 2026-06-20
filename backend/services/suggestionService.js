export const generateAdvancedSuggestions = ({
  parsedData,
  missingSections,
  roleAnalysis,
  overallScore
}) => {
  const suggestions = [];

  if (!parsedData.name) {
    suggestions.push("Add your full name clearly at the top of the resume.");
  }

  if (!parsedData.email) {
    suggestions.push("Add a professional email address so recruiters can contact you.");
  }

  if (!parsedData.phone) {
    suggestions.push("Add your phone number in the contact section.");
  }

  if (parsedData.skills.length < 5) {
    suggestions.push("Include more relevant technical skills to make your profile stronger.");
  }

  if (missingSections.includes("Projects")) {
    suggestions.push("Add 1 or 2 strong academic or personal projects with clear tech stack and purpose.");
  }

  if (parsedData.projects.length === 1) {
    suggestions.push("Try adding one more project to make your resume more impressive.");
  }

  if (missingSections.includes("Experience")) {
    suggestions.push("If you do not have job experience, add internships, training, workshops, or practical work.");
  }

  if (missingSections.includes("Certifications")) {
    suggestions.push("Add certifications, online courses, or workshops to improve credibility.");
  }

  if (missingSections.includes("Education")) {
    suggestions.push("Education section is very important. Add college, degree, and academic details properly.");
  }

  if (roleAnalysis.roleMatchPercentage < 40) {
    suggestions.push(`Your resume has a low match for ${roleAnalysis.selectedRole}. Add more role-specific skills and keywords.`);
  } else if (roleAnalysis.roleMatchPercentage < 70) {
    suggestions.push(`Your resume has a moderate match for ${roleAnalysis.selectedRole}. Improve it by adding stronger role-relevant projects and skills.`);
  }

  if (roleAnalysis.missingRoleSkills.length > 0) {
    suggestions.push(
      `For ${roleAnalysis.selectedRole}, you should try to include these skills if you know them: ${roleAnalysis.missingRoleSkills.slice(0, 6).join(", ")}.`
    );
  }

  if (overallScore < 50) {
    suggestions.push("Your resume needs major improvement in both content and structure.");
  } else if (overallScore < 75) {
    suggestions.push("Your resume is decent, but it can be improved to increase shortlist chances.");
  } else {
    suggestions.push("Your resume is already good. Focus on stronger project descriptions and role-specific keywords.");
  }

  suggestions.push("Use action verbs like Developed, Built, Designed, Implemented, and Created in project descriptions.");
  suggestions.push("Keep project descriptions short, clear, and focused on technologies and outcomes.");

  return [...new Set(suggestions)];
};