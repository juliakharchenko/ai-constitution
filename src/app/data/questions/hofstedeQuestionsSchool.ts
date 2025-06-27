import { QuestionnaireQuestion } from "../../types";

// School/Educational Context
export const hofstedeQuestionsSchool: QuestionnaireQuestion[] = [
    {
      id: "school_pd1",
      text: "Teachers should make classroom decisions without student input.",
      dimension: "powerDistance",
      weight: 1
    },
    {
      id: "school_pd2",
      text: "Students should feel comfortable challenging their teacher's opinions in class.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "school_pd3",
      text: "Teachers should treat all students equally regardless of their academic performance.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "school_ic1",
      text: "Individual academic achievement is more important than helping classmates succeed.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "school_ic2",
      text: "Students should focus on their own learning rather than group projects.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "school_ic3",
      text: "Class discussions work better when students collaborate rather than compete.",
      dimension: "individualismCollectivism",
      weight: -1
    },
    {
      id: "school_mf1",
      text: "Academic competition between students drives better learning outcomes.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "school_mf2",
      text: "A supportive learning environment is more important than academic rankings.",
      dimension: "masculinityFemininity",
      weight: -1
    },
    {
      id: "school_mf3",
      text: "School success should be measured primarily by grades and test scores.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "school_ua1",
      text: "School rules should be followed strictly even when they don't make sense.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "school_ua2",
      text: "I prefer classes with flexible schedules and open-ended assignments.",
      dimension: "uncertaintyAvoidance",
      weight: -1
    },
    {
      id: "school_ua3",
      text: "Clear syllabi and structured lesson plans are essential for effective learning.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "school_lto1",
      text: "Educational institutions should maintain their traditional teaching methods.",
      dimension: "longTermOrientation",
      weight: -1
    },
    {
      id: "school_lto2",
      text: "Schools should continuously adapt their curricula to prepare students for the future.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "school_lto3",
      text: "Learning practical skills for future careers is more important than studying classical subjects.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "school_ir1",
      text: "Students should limit their social activities to focus on their studies.",
      dimension: "indulgenceRestraint",
      weight: -1
    },
    {
      id: "school_ir2",
      text: "School should be enjoyable and include plenty of fun activities alongside learning.",
      dimension: "indulgenceRestraint",
      weight: 1
    },
    {
      id: "school_ir3",
      text: "Academic discipline is more important than student enjoyment and social activities.",
      dimension: "indulgenceRestraint",
      weight: -1
    }
  ];