  import { QuestionnaireQuestion} from "../../types";
  
  // Home/Family Context
  export const hofstedeQuestionsHome: QuestionnaireQuestion[] = [
    {
      id: "home_pd1",
      text: "Parents should make family decisions without consulting their children.",
      dimension: "powerDistance",
      weight: 1
    },
    {
      id: "home_pd2",
      text: "Children should feel free to express disagreement with their parents' decisions.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "home_pd3",
      text: "Family members should have equal say in household matters regardless of age.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "home_ic1",
      text: "Personal space and privacy are more important than family togetherness.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "home_ic2",
      text: "Individual family members should pursue their own interests over family activities.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "home_ic3",
      text: "Family decisions should prioritize what's best for the whole family over individual wants.",
      dimension: "individualismCollectivism",
      weight: -1
    },
    {
      id: "home_mf1",
      text: "Children should be encouraged to compete and excel over their siblings.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "home_mf2",
      text: "Creating a harmonious home environment is more important than individual achievements.",
      dimension: "masculinityFemininity",
      weight: -1
    },
    {
      id: "home_mf3",
      text: "A family's success should be measured by their material possessions and status.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "home_ua1",
      text: "Household rules should be strictly followed even when they seem unnecessary.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "home_ua2",
      text: "I'm comfortable with spontaneous changes to family plans and routines.",
      dimension: "uncertaintyAvoidance",
      weight: -1
    },
    {
      id: "home_ua3",
      text: "Clear family routines and expectations are essential for a well-functioning household.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "home_lto1",
      text: "Family traditions and customs should be maintained and passed down to children.",
      dimension: "longTermOrientation",
      weight: -1
    },
    {
      id: "home_lto2",
      text: "Families should adapt their lifestyle to changing times rather than stick to old ways.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "home_lto3",
      text: "Saving for the future is more important than maintaining expensive family traditions.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "home_ir1",
      text: "Family members should limit their entertainment and leisure spending.",
      dimension: "indulgenceRestraint",
      weight: -1
    },
    {
      id: "home_ir2",
      text: "It's important for families to enjoy life and spend on experiences together.",
      dimension: "indulgenceRestraint",
      weight: 1
    },
    {
      id: "home_ir3",
      text: "Financial discipline is more important than family enjoyment and fun activities.",
      dimension: "indulgenceRestraint",
      weight: -1
    }
  ];