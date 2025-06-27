import { QuestionnaireQuestion } from "../../types";

// Community/Neighborhood Context
export const hofstedeQuestionsCommunity: QuestionnaireQuestion[] = [
    {
      id: "community_pd1",
      text: "Community leaders should make neighborhood decisions without consulting all residents.",
      dimension: "powerDistance",
      weight: 1
    },
    {
      id: "community_pd2",
      text: "All community members should have equal voice in local issues regardless of status.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "community_pd3",
      text: "Local authorities should be accessible and responsive to all citizens equally.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "community_ic1",
      text: "People should prioritize their property values over community needs.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "community_ic2",
      text: "Individual privacy is more important than community involvement.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "community_ic3",
      text: "Community decisions should prioritize collective benefit over individual convenience.",
      dimension: "individualismCollectivism",
      weight: -1
    },
    {
      id: "community_mf1",
      text: "Neighborhoods should compete with each other for resources and recognition.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "community_mf2",
      text: "Creating a caring, supportive community is more important than prestigious achievements.",
      dimension: "masculinityFemininity",
      weight: -1
    },
    {
      id: "community_mf3",
      text: "A community's success should be measured by property values and economic indicators.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "community_ua1",
      text: "Community rules and regulations should be strictly enforced even for minor violations.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "community_ua2",
      text: "I'm comfortable with flexible community guidelines that adapt to different situations.",
      dimension: "uncertaintyAvoidance",
      weight: -1
    },
    {
      id: "community_ua3",
      text: "Clear zoning laws and community standards are essential for neighborhood stability.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "community_lto1",
      text: "Communities should preserve their historical character and resist change.",
      dimension: "longTermOrientation",
      weight: -1
    },
    {
      id: "community_lto2",
      text: "Neighborhoods should adapt and modernize to meet changing demographic needs.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "community_lto3",
      text: "Long-term community planning is more important than maintaining current traditions.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "community_ir1",
      text: "Communities should restrict entertainment venues and nightlife to maintain order.",
      dimension: "indulgenceRestraint",
      weight: -1
    },
    {
      id: "community_ir2",
      text: "Neighborhoods should have plenty of recreational activities and entertainment options.",
      dimension: "indulgenceRestraint",
      weight: 1
    },
    {
      id: "community_ir3",
      text: "Community resources should prioritize essential services over leisure activities.",
      dimension: "indulgenceRestraint",
      weight: -1
    }
  ];