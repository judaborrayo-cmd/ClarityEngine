// Presentation only: canonical questionnaire data and server insight eligibility stay unchanged.
export const assessmentSections: Record<number, { title: string; description: string; completion: string }> = {
  1: {
    title: "Is your offer clear—and worth buying?",
    description: "Look at what customers get, why it matters, and what real buying decisions tell you about demand.",
    completion: "Your offer is where it all begins. You've looked at what you're selling and why someone would want it. Next, let's look at who's most likely to buy and what gets them searching in the first place.",
  },
  2: {
    title: "Who is most likely to buy, and what gets them moving?",
    description: "Look at your best-fit customers, the situations that prompt them to act, and where you can reach more people like them.",
    completion: "Knowing who your customers are is useful. Understanding what makes them act is where things get interesting. Next, let's see whether your message speaks to what those customers actually care about.",
  },
  3: {
    title: "Will the right people understand, care, and believe?",
    description: "Look at how clearly your message explains the value, reflects customer language, and gives people a reason to trust you.",
    completion: "Halfway there. You've examined how your business communicates its value. But getting someone's attention is only half the battle. Next, let's see how easy you make it for interested customers to take action.",
  },
  4: {
    title: "How easy is it to take the next step?",
    description: "Look at what happens after interest: the promise people see, the trust they need, and anything that makes the next step harder.",
    completion: "Getting people interested is one thing. Making it easy for them to become customers is another. You've now reviewed that experience. Next, let's look at how people find your business in the first place.",
  },
  5: {
    title: "Are you bringing the right people into the picture?",
    description: "Look at how people find you, what each channel contributes, and how you decide which traffic tests deserve time and money.",
    completion: "More traffic isn't always better traffic. You've looked at how people find you and how you test what's working. One last piece of the puzzle: can you trust your numbers enough to know what to do next?",
  },
  6: {
    title: "Do your numbers help you decide what to do next?",
    description: "Look at whether you can trust your numbers, connect marketing activity to business results, and turn what you learn into a useful next decision.",
    completion: "Measurement & Learning completes the picture. All six levers are covered; we can now consider your answers together to identify where to focus next.",
  },
};

export const assessmentInsights: Record<string, string> = {
  O1: "Explain your offer in one sentence: who it helps, what they get, and why it matters. If that takes a paragraph, clarify the offer before asking an ad to do the heavy lifting.",
  O2: "Pair what you deliver with what changes for the customer. “Weekly English coaching” becomes “leading meetings confidently in English.” Keep the outcome specific and believable.",
  O5: "Before putting more money behind an offer, learn why prospects say yes, no, or not yet. Those reasons help separate demand problems from explanation problems.",
  A2: "Ask your best customers what happened when they started looking for help. “Business owner” describes a person; “just lost a major client” gives your marketing a situation to speak to.",
  M2: "For each important feature, finish “That means you can…” Keep the feature as evidence and make the benefit clear. Customers should not need a translation department.",
  M3: "Save the phrases customers use in conversations, reviews, and sales calls. Repeated descriptions of problems and desired results can sharpen your message—without polishing away their meaning.",
  C3: "Follow one promise from the ad or post to the landing page and next step. Can someone recognize the same offer throughout? A strong click needs a clear path afterward.",
  T3: "When results drop, check what changed: the campaign, offer, website, tracking, or buying conditions. “The ads got worse” is an observation, not yet an explanation.",
  T5: "Before funding a test, name the question it should answer and the decision you’ll make afterward. AI can supply plenty of ideas; your budget still needs a useful shortlist.",
  ML2: "Choose a business result to watch, then investigate changes with supporting numbers. If revenue falls, check sales and conversion before blaming clicks. Useful metrics guide decisions, not just dashboards.",
};

export const onlineWorkSessionIntro = "Use these questions to connect your first opportunity to what you see in your business. Record what you know, choose your next action, and decide how you’ll check the result.";
