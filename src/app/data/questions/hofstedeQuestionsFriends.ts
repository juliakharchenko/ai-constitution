import { QuestionnaireQuestion } from "../../types";

// Friends/Social Context
export const hofstedeQuestionsFriends: QuestionnaireQuestion[] = [
    {
      id: "friends_pd1",
      text: "In friend groups, natural leaders should make decisions for everyone.",
      dimension: "powerDistance",
      weight: 1
    },
    {
      id: "friends_pd2",
      text: "All friends should have equal input in group decisions regardless of experience.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "friends_pd3",
      text: "Friend groups work best when everyone's opinion is valued equally.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "friends_ic1",
      text: "Personal goals should take priority over group activities with friends.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "friends_ic2",
      text: "It's okay to cancel plans with friends if something better comes up.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "friends_ic3",
      text: "Group harmony is more important than individual preferences when making plans.",
      dimension: "individualismCollectivism",
      weight: -1
    },
    {
      id: "friends_mf1",
      text: "Friendly competition between friends makes relationships more interesting.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "friends_mf2",
      text: "Supporting each other emotionally is more important than competing or showing off.",
      dimension: "masculinityFemininity",
      weight: -1
    },
    {
      id: "friends_mf3",
      text: "Friends should celebrate each other's material successes and achievements.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "friends_ua1",
      text: "Friend groups should have clear, consistent rules about behavior and expectations.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "friends_ua2",
      text: "I enjoy spontaneous hangouts and unplanned adventures with friends.",
      dimension: "uncertaintyAvoidance",
      weight: -1
    },
    {
      id: "friends_ua3",
      text: "It's important to have predictable routines and regular meetups with friends.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "friends_lto1",
      text: "Friendships should maintain the same activities and traditions over time.",
      dimension: "longTermOrientation",
      weight: -1
    },
    {
      id: "friends_lto2",
      text: "Friend groups should evolve and try new activities as people grow and change.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "friends_lto3",
      text: "Building long-term friendships is more important than having fun in the moment.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "friends_ir1",
      text: "Friends should encourage each other to be responsible and avoid excessive fun.",
      dimension: "indulgenceRestraint",
      weight: -1
    },
    {
      id: "friends_ir2",
      text: "The main purpose of friendship is to enjoy life and have good times together.",
      dimension: "indulgenceRestraint",
      weight: 1
    },
    {
      id: "friends_ir3",
      text: "Self-control and moderation are important values to share with friends.",
      dimension: "indulgenceRestraint",
      weight: -1
    }
  ];