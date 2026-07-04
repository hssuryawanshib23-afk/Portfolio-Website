export type BlogBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string }
    | { type: "image"; src: string; alt: string; caption?: string };

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    content: BlogBlock[];
};

const paragraph = (text: string): BlogBlock => ({ type: "paragraph", text });
const heading = (text: string): BlogBlock => ({ type: "heading", text });
const quote = (text: string): BlogBlock => ({ type: "quote", text });
const list = (items: string[]): BlogBlock => ({ type: "list", items });
const image = (src: string, alt: string, caption?: string): BlogBlock => ({
    type: "image",
    src,
    alt,
    caption,
});

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "how-brave-works",
        title: "How Brave Works, Simply",
        date: "2026-07-05",
        summary:
            "A short, realistic explanation of Brave: what it blocks, what it keeps, and why it feels faster than a normal browser.",
        tags: ["Browsers", "Privacy", "Web"],
        content: [
            paragraph("Brave is a web browser built on Chromium, the same open-source browser engine family used by Chrome. That means most websites work normally, extensions usually behave as expected, and the basic browser experience feels familiar."),
            paragraph("The main difference is what Brave chooses to block by default. A normal webpage often loads the article, images, ads, analytics scripts, social trackers, cookie popups, and small invisible requests that follow you across websites. Brave tries to remove a lot of that extra tracking layer before the page fully loads."),
            heading("The Simple Flow"),
            list([
                "You open a website.",
                "Brave checks the page requests against its blocking rules.",
                "Known trackers, aggressive ads, fingerprinting tricks, and some third-party cookies can be blocked.",
                "The page loads with less background noise.",
                "You can adjust Shields if a website breaks or needs something specific.",
            ]),
            paragraph("This is why Brave can feel faster. It is not magic speed. It is often just doing less unnecessary work. Fewer tracking scripts means fewer network requests, less JavaScript, and less stuff competing for your CPU."),
            heading("What Shields Do"),
            paragraph("Brave Shields is the control panel for this behavior. It lets you decide how strict Brave should be on a site. If a page is broken because it expected a blocked script, you can relax Shields for that site instead of changing your whole browser setup."),
            paragraph("That tradeoff matters. Privacy tools that are too strict can make the web annoying. Tools that are too relaxed do not protect much. Brave tries to sit in the middle: block common tracking by default, but still let normal browsing work."),
            heading("Search And Rewards"),
            paragraph("Brave also has its own search engine and an optional rewards system. Brave Search is separate from Google and is designed around more private search. Brave Rewards is optional and lets users see privacy-respecting ads in exchange for BAT tokens."),
            paragraph("The rewards part is not needed to use Brave. You can ignore it completely and still use Brave as a normal privacy-focused browser."),
            heading("The Honest Take"),
            paragraph("Brave is not invisibility mode. Your internet provider, websites you log into, and services you use can still know things about you. But compared to a default browser setup, Brave reduces a lot of casual tracking with very little setup."),
            quote("The simple version: Brave is Chrome-like browsing with tracker blocking turned on from the start."),
            paragraph("That is the realistic reason people use it. It keeps the web familiar, removes a lot of background tracking, and gives you a few privacy controls without asking you to become a browser engineer."),
        ],
    },
    {
        slug: "cpm-in-plain-english",
        title: "CPM, but make it normal",
        date: "2023-05-08",
        summary:

            "A very informal note on CPM, the thing that tells you which tasks are secretly running the whole project.",
        tags: ["Planning", "Productivity", "CPM"],
        content: [
            paragraph("CPM stands for Critical Path Method, which is just a fancy way of saying: figure out the tasks you absolutely cannot mess up if you want the project to finish on time."),
            paragraph("Think of it like planning a trip with your friends. If one person is late to leave, the whole plan slides. CPM is the map that shows which delays actually matter and which ones are just annoying noise."),
            image(
                "/blog/cpm/cpm-diagram.svg",
                "A simple CPM flow showing tasks A through F, with the critical path highlighted in gold.",
                "Tiny visual cheat sheet: the gold path is the one that decides the finish date."
            ),
            heading("The short version"),
            list([
                "List every task.",
                "Draw the dependencies.",
                "Find the longest chain of must-finish-before relationships.",
                "That chain is the critical path.",
                "If that path slips, the whole project slips.",
            ]),
            paragraph("So CPM is not about being fancy. It is about not getting fooled by tasks that feel urgent but do not actually change the finish date. That is the whole superpower."),
            quote("If you only remember one thing: the critical path is the schedule's spine."),
            paragraph("It is boring in the best possible way. You use it when you want to stop guessing and start seeing which work really controls the deadline."),
        ],
    },
    {
        slug: "implementing-a-neurips-2024-learning-augmented-algorithm",
        title: "Implementing A NeurIPS 2024 Learning-Augmented Algorithm",
        date: "2026-03-21",
        summary:

            "I built a practical reference implementation of a NeurIPS 2024 dynamic submodular maximization framework, here's what i've done",
        tags: ["Algorithms", "Research", "Optimization"],
        content: [
            paragraph("I implemented a practical reference version of the NeurIPS 2024 paper Learning-Augmented Dynamic Submodular Maximization. That sentence sounds much scarier than the actual idea."),
            quote("Short version: I built a system that keeps choosing a small best group from a world that keeps changing, while using predictions as hints instead of blindly trusting them."),
            image(
                "/blog/ladsm/portfolio_sweep.png",
                "A six-panel benchmark figure comparing LADSM, Dynamic, and OfflineGreedy across prediction error, cardinality k, and tolerance w.",
                "Six benchmark panels: value on the top row, streaming oracle queries on the bottom row. The comparison is between LADSM, a dynamic baseline, and an offline prediction-heavy baseline.",
            ),
            heading("What Are We Even Doing?"),
            paragraph("Imagine the algorithm is running a club and students keep entering and leaving the room. I can only pick a few of them for a task. I do not just want individually good people. I want a team that works well together and covers different strengths. Now imagine someone gives me a rough forecast of who is likely to show up and when. The job of the algorithm is to prepare faster, but still survive if the forecast turns out to be wrong."),
            paragraph("That is the whole project in spirit. The paper studies this idea mathematically. My implementation turns that idea into code, experiments, plots, and an explanation that is easier to digest."),
            heading("Where Do We Even Use It?"),
            paragraph("Simple example: think of a food-delivery app at 8 PM. The app can show only a few restaurants on top, new orders keep coming, some restaurants go offline, and traffic keeps changing. The algorithm keeps re-picking the best small set of restaurants in real time using demand predictions as hints, but still works even when those predictions are wrong."),
            list([
                "Realtime recommendations where users and items constantly change.",
                "Inventory or delivery prioritization with uncertain demand forecasts.",
                "Sensor, alert, or monitoring selection under limited compute budget.",
            ]),
            heading("Quick Glossary"),
            list([
                "LADSM: this is the main algorithmic framework I implemented. You can read it as a smart decision system that uses predictions as hints while data keeps changing.",
                "Dynamic: here it means the available items are not fixed. They keep getting inserted and deleted over time.",
                "Streaming: here it means I do not solve the problem once on a frozen dataset. I process updates one by one as they arrive.",
                "Learning-augmented: this means the algorithm gets extra help in the form of predictions. It is not doing blind guessing on its own. It is using hints produced from some predictive process.",
                "Submodular: this is the kind of objective where the first useful item helps a lot, but the tenth similar item helps much less. In simple words: diversity matters and duplicates help less and less.",
                "Maximization: the algorithm is trying to make the score as large as possible.",
                "Cardinality k: this is just the maximum number of items the algorithm is allowed to keep in its chosen set.",
                "Prediction error eta: this measures how wrong the predictions are.",
                "Tolerance w: this is how forgiving the algorithm is if a prediction is slightly early or slightly late.",
                "Oracle query: every time the algorithm asks the objective function, 'how good is this set?' I count that as one query.",
            ]),
            heading("What Does Submodular Mean Without The Fancy Word?"),
            paragraph("This was the word that sounded the most abstract the first time I read it. The easiest way I now think about it is this: if I already have one flashlight, getting a second flashlight is helpful, but not as exciting as getting a map. In other words, similar things give smaller and smaller extra benefit. That 'smaller extra benefit' behavior is exactly why these problems often reward variety instead of repetition."),
            paragraph("So when I say the algorithm is solving a submodular maximization problem, what I really mean is: I want to choose a small set that gives broad usefulness, not just repeated usefulness."),
            heading("What Does Streaming Mean Here?"),
            paragraph("Streaming here does not mean Netflix or YouTube streaming. It means updates keep coming one by one. Today one item appears, then another disappears, then a third arrives later. Instead of waiting for the whole world to stop changing, the algorithm keeps updating its answer as the changes come in."),
            paragraph("That matters because many real systems behave like this. Products go in and out of stock. Posts appear and get removed. users become active and inactive. Sensors fail and come back online. If I recompute everything from scratch every single time, it becomes slow and wasteful."),
            heading("So What Is LADSM, Really?"),
            paragraph("LADSM is the short name used for the learning-augmented dynamic submodular maximization framework from the paper. In plain English, it is a method for repeatedly choosing a good small set while the available options keep changing and while I have some predictions about those future changes."),
            paragraph("The key mindset is not 'trust the prediction.' The key mindset is 'use the prediction when it helps, but do not die when it lies.' That balance is why I found the paper interesting enough to implement."),
            heading("The Three Lines In The Graph"),
            heading("How To Read The Figure In Very Layman Terms"),
            list([
                "LADSM: my prediction-aware method. It tries to use future hints and still keep adapting online.",
                "Dynamic: a baseline that ignores predictions completely and only reacts to what is actually happening.",
                "OfflineGreedy: a baseline that trusts the predicted future much more heavily and therefore does very little work during the live stream.",
            ]),
            paragraph("So the graph is not just comparing three random lines. It is really comparing three mindsets: ignore predictions, trust predictions heavily, or use predictions carefully."),
            heading("How To Read The Figure In Very Layman Terms"),
            list([
                "Top row means how good the chosen set is.",
                "Bottom row means how much work the algorithm had to do while updates were arriving.",
                "Left column asks: what happens if the predictions become more wrong?",
                "Middle column asks: what happens if the algorithm is allowed to keep more items?",
                "Right column asks: what happens if I become more forgiving about timing mistakes in the predictions?",
            ]),
            paragraph("If you want the one-minute reading: better hints usually help prediction-based methods, a larger budget usually helps everyone because I can keep more useful items, and a larger tolerance can make the prediction-aware method less twitchy."),
            heading("What The Left Column Means: Prediction Error"),
            paragraph("Prediction error is just a fancy way of saying 'how wrong were my hints?' If prediction error goes up, the hints are getting worse."),
            paragraph("The Dynamic baseline stays mostly steady because it never cared about predictions anyway. OfflineGreedy can suffer because it relies more on the predicted future. LADSM sits in the middle because it uses the hints, but still keeps an online fallback."),
            heading("What The Middle Column Means: Cardinality k"),
            paragraph("Cardinality k is just the number of items the algorithm is allowed to keep. If k becomes larger, I can keep more useful items, so the score usually improves."),
            paragraph("But there is a tradeoff. A bigger allowed set also means the algorithm has more combinations to think about, so query cost can increase too."),
            heading("What The Right Column Means: Tolerance w"),
            paragraph("Tolerance w tells me how forgiving the algorithm is about timing mistakes. If the prediction says an item comes at time 10 and it actually comes at time 11, do I call that a failure or do I say 'close enough'? That is what w controls."),
            paragraph("In this implementation, a larger tolerance often makes LADSM calmer and cheaper during the live stream, because it does not panic over every small timing mismatch."),
            heading("Now The Slightly More Technical Version"),
            list([
                "I precompute candidate structures from the predicted active sets before the live stream begins.",
                "During the live phase, I maintain a dynamic residual solver that keeps updating the answer when insertions and deletions happen.",
                "If the predictions drift too far from reality, the framework restarts a phase and refreshes its internal state.",
                "I also run multiple guesses for parameters like gamma and eta, which is faithful to the paper structure but adds overhead in my practical implementation.",
            ]),
            paragraph("One important thing I want to be honest about: this is a practical reference implementation of the framework, not a perfect replica of the original optimized stack behind the paper's theorem-level update bounds. I followed the paper's outer design closely, but I used practical substitutes for some of the deeper dynamic internals."),
            paragraph("Because of that, I read these plots as architecture-and-tradeoff plots. They show how a prediction-aware dynamic framework behaves, how the baselines differ, and where the costs show up. I do not present them as 'I exactly reproduced the paper's asymptotic frontier.'"),
            heading("Honest Takeaway"),
            paragraph("The strongest claim here is not that I beat every baseline. The strongest claim is that I turned a modern theory paper into executable code, built experiments around it, and can explain every major term without hiding behind jargon."),
            paragraph("That is exactly the kind of project I want in my portfolio: technical enough to matter, but clear enough that I can carry the reader with me instead of losing them in vocabulary."),
        ],
    },
].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

export function getPostBySlug(slug: string) {
    return BLOG_POSTS.find((post) => post.slug === slug);
}
